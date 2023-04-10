package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.Quiz;
import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import com.simplyalgos.backend.quiz.dtos.TakenQuizAverageScore;
import com.simplyalgos.backend.quiz.dtos.TakenQuizzesDashboardDTO;
import com.simplyalgos.backend.quiz.mappers.QuizMapper;
import com.simplyalgos.backend.quiz.repositories.QuizRepository;
import com.simplyalgos.backend.quiz.repositories.TakeQuizRepository;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import io.swagger.v3.core.util.Json;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class TakeQuizServiceImp implements TakeQuizService {

    private final TakeQuizRepository takeQuizRepository;
    private final QuizRepository quizRepository;
    private final UserRepository userRepository;
    private final UserService userService;
    private final QuizMapper quizMapper;

    private final TakeQuizAverageService takeQuizAverageService;


    @Override
    public TakeQuizDTO getTimeStamp(TakeQuizDTO takeQuizDTO) throws NoSuchElementException {
        Optional<TakeQuiz> takeQuiz = takeQuizRepository
                .findByTakeQuizIdAndTakenBy_UserIdAndQuizReference_QuizId(
                        takeQuizDTO.getTakeQuizId(),
                        takeQuizDTO.getUserId(),
                        takeQuizDTO.getQuizId());
        if (takeQuiz.isPresent()) {
            return TakeQuizDTO.builder()
                    .quizId(takeQuiz.get().getQuizReference().getQuizId())
                    .userId(takeQuiz.get().getTakenBy().getUserId())
                    .takeQuizId(takeQuiz.get().getTakeQuizId())
                    .startedAt(takeQuiz.get().getStartedAt())
                    .finishedAt(takeQuiz.get().getFinishedAt())
                    .score(takeQuiz.get().getScore())
                    .build();
        }
        throw new NoSuchElementException(
                MessageFormat.format("Take Quiz with Id {0} not found", takeQuizDTO.getTakeQuizId()));
    }


    @Override
    public List<TakeQuizDTO> getAllUserQuizScore(UUID userId, UUID quizId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);

        if (userOptional.isPresent() && quizOptional.isPresent()) {
            List<TakeQuiz> takeQuizList = takeQuizRepository
                    .findAllByTakenBy_UserIdAndQuizReference_QuizId(userId, quizId);
            log.debug("All of user Quiz quiz scores" + takeQuizList.size());

            return quizMapper.takeQuizToTakeQuizDTO(takeQuizList);
        }
        throw new NoSuchElementException(
                MessageFormat.format("Take quiz with id {0} not found or userId not found", quizId));
    }

    @Override
    public ObjectPagedList<?> getAllUserTakenQuiz(Pageable pageable, String userId) {
        Page<TakeQuiz> takeQuizPage = takeQuizRepository.findAllByTakenBy_UserId(UUID.fromString(userId), pageable);
        log.debug("attempting mapping for getAllUserTakenQuiz");
        List<TakenQuizzesDashboardDTO> takenQuizzesDashboardDTOList =
                quizMapper.takeQuizToTakenQuizzesDashboardDTO(takeQuizPage.getContent());
        return new ObjectPagedList<>(
                takenQuizzesDashboardDTOList,
                PageRequest.of(
                        takeQuizPage.getPageable().getPageNumber(),
                        takeQuizPage.getPageable().getPageSize(),
                        takeQuizPage.getSort()),
                takeQuizPage.getTotalElements()
        );
    }


    @Deprecated
    @Override
    public ObjectPagedList getAllUserTakenQuizByQuizId(Pageable pageable, String userId, String quizId) {
        Page<TakeQuiz> takeQuizPage = takeQuizRepository
                .findAllByQuizReference_QuizIdAndTakenBy_UserId(UUID.fromString(quizId),
                        UUID.fromString(userId),
                        pageable);
        log.debug("attempting mapping for getAllUserTakenQuizByQuizId");

        List<TakenQuizzesDashboardDTO> takenQuizzesDashboardDTOList =
                quizMapper.takeQuizToTakenQuizzesDashboardDTO(takeQuizPage.getContent());
        return new ObjectPagedList<>(
                takenQuizzesDashboardDTOList,
                PageRequest.of(
                        takeQuizPage.getPageable().getPageNumber(),
                        takeQuizPage.getPageable().getPageSize(),
                        takeQuizPage.getSort()),
                takeQuizPage.getTotalElements()
        );
    }

    @Override
    public List<TakeQuizDTO> getAllQuizzesTakenByUser(UUID userId) {
        User user = userService.getUser(userId);
        List<TakeQuiz> takeQuizList = takeQuizRepository.findAllByTakenBy_UserId(user.getUserId());
        return quizMapper.takeQuizToTakeQuizDTO(takeQuizList);
    }

    //    PASSED TESTS
    @Override
    public TakenQuizAverageScore getAverageQuizScore(UUID quizId) {
        log.debug("Does quiz exists");
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        if (quiz.isPresent()) {
            log.debug("Getting all of takenQuiz");

            List<TakeQuiz> takeQuizList = takeQuizRepository.findAllByQuizReference_QuizId(quizId);

            double average = 0;
            for (TakeQuiz takeQuiz : takeQuizList) {
                average += takeQuiz.getScore();
            }
            return TakenQuizAverageScore.builder()
                    .avgScore(average / takeQuizList.size())
                    .quizId(quiz.get().getQuizId())
                    .maxScore(quiz.get().getScore())
                    .build();
        }
        throw new NoSuchElementException(
                MessageFormat.format("Take quiz with id {0} not found", quizId));
    }

    //  PASSED TESTS

//    check the number of quiz questions and calculate the score based on the number of questions user has gotten correct
//    each question has the same weight
    @Override
    public UUID createTakenQuiz(TakeQuizDTO takeQuizDTO) {
        log.info("Checking if the quiz exists" + takeQuizDTO.getTakeQuizId());
        Optional<Quiz> quizOptional = quizRepository.findById(takeQuizDTO.getQuizId());
        Optional<User> userOptional = userRepository.findById(takeQuizDTO.getUserId());
        log.debug("creating a new Take Quiz With: " + takeQuizDTO.getTakeQuizId());
        if (quizOptional.isPresent() && userOptional.isPresent()) {
            log.debug("Starting the creation of a new Take Quiz");
            TakeQuiz takeQuiz = takeQuizRepository.saveAndFlush(
                    TakeQuiz.builder()
                            .quizReference(quizOptional.get())
                            .takenBy(userOptional.get())
                            .score(takeQuizDTO.getScore())
                            .startedAt(takeQuizDTO.getStartedAt())
                            .finishedAt(takeQuizDTO.getFinishedAt())
                            .build()
            );
            log.debug("Finishing the creation of a new take quiz");
            takeQuizAverageService.recordFunctionSelector(takeQuiz);
            return takeQuiz.getTakeQuizId();
        }
        log.debug("Bad request");
        throw new NoSuchElementException(
                MessageFormat.format("Take quiz with id {0} not found or user not found", takeQuizDTO.getUserId()));
    }

    @Override
    public UUID deleteAllUserTakeQuizHistory(UUID userId) {
        takeQuizRepository.deleteAllByTakenBy_UserId(userId);
        takeQuizAverageService.resetAllAverageQuizScore(userId);
        log.info("deleteAllUserTakeQuizHistory not implemented");
        return userId;
    }

    @Override
    public UUID deleteAllTakenQuizForSpecificQuiz(UUID userId, UUID quizId) {
        takeQuizRepository.deleteAllByTakenBy_UserIdAndQuizReference_QuizId(userId,quizId);
        takeQuizAverageService.resetAverageQuizScore(userId,quizId);
        return userId;
    }

    @Override
    public UUID deleteOldUserTakenQuizHistory(UUID userId) {
        log.info("deleteOldUserTakenQuizHistory not implemented");
        return userId;
    }

//    private final UserMapper userMapper;
//    @Override
//    public void test(List<TakeQuiz> takeQuizList) {
//        List<TakenQuizzesDashboardDTO> takenQuizzesDashboardDTOList
//                = quizMapper.takeQuizToTakenQuizzesDashboardDTO(takeQuizList);
//
//        int i = 0;
//        for(TakenQuizzesDashboardDTO takenQuizzesDashboardDTO1: takenQuizzesDashboardDTOList){
//            log.debug("INDEX " + i + "\n " + Json.pretty(takenQuizzesDashboardDTO1));
//        }
//
//
//    }


    private int getTimeDiff(TakeQuiz takeQuiz){
        long mill = takeQuiz.getStartedAt().getTime() - takeQuiz.getFinishedAt().getTime();
        log.debug("The time: " + (mill / 60000));
        int min = (int) (mill / 60000);
        return (min < 0) ? ((-1)*min) : min;
    }

}
