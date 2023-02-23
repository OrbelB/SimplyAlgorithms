package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.Quiz;
import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.domains.quizId.TakeQuizId;
import com.simplyalgos.backend.quiz.dtos.QuizScoreDTO;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import com.simplyalgos.backend.quiz.dtos.TakenQuizAverageScore;
import com.simplyalgos.backend.quiz.repositories.QuizRepository;
import com.simplyalgos.backend.quiz.repositories.TakeQuizRepository;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import io.swagger.v3.core.util.Json;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.text.MessageFormat;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class TakeQuizServiceImp implements TakeQuizService {

    private final TakeQuizRepository takeQuizRepository;
    private final QuizRepository quizRepository;

    private final UserRepository userRepository;

    @Override
    public TakeQuizDTO getTimeStamp(TakeQuizDTO takeQuizDTO) throws NoSuchElementException {
        Optional<TakeQuiz> takeQuiz = takeQuizRepository
                .findByTakeQuizIdAndTakenBy_UserIdAndQuizReference_QuizId(
                        takeQuizDTO.getTakeQuizId(),
                        takeQuizDTO.getQuizId(),
                        takeQuizDTO.getUserId());
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
                MessageFormat.format("Take Quiz with Id {0} not found", Json.pretty(takeQuizDTO)));
    }

//    Use getAllUserQuizScore
//    @Override
//    public QuizScoreDTO getUserQuizScore(TakeQuizId takeQuizId) throws NoSuchElementException {
//        if (takeQuizRepository.existsById(takeQuizId)) throw new NoSuchElementException(
//                MessageFormat.format("Take Quiz with Id {0} not found", takeQuizId.getQuizId()));
//        {
//            log.debug("Returning the score");
//            return takeQuizRepository.findById(takeQuizId).get().getScore();
//        }
//    }

    @Override
    public List<TakeQuizDTO> getAllUserQuizScore(UUID userId, UUID quizId) {
        Optional<User> userOptional = userRepository.findById(userId);
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);

        if (userOptional.isPresent() && quizOptional.isPresent()){
            List<TakeQuizDTO> takeQuizDTOList = new ArrayList<>();
            List<TakeQuiz> takeQuizList = takeQuizRepository.findAllByTakeQuizIdaAndQuizReference_QuizId(userId, quizId);
            for(TakeQuiz takeQuiz: takeQuizList){
                takeQuizDTOList.add(TakeQuizDTO.builder()
                        .quizId(takeQuiz.getQuizReference().getQuizId())
                        .userId(takeQuiz.getTakenBy().getUserId())
                        .takeQuizId(takeQuiz.getTakeQuizId())
                        .startedAt(takeQuiz.getStartedAt())
                        .finishedAt(takeQuiz.getFinishedAt())
                        .score(takeQuiz.getScore())
                        .build());
            }
            return takeQuizDTOList;
        }
        throw new NoSuchElementException(
                MessageFormat.format("Take quiz with id {0} not found or userId not found", quizId));
    }

    @Override
    public ObjectPagedList<?> getAllTakenQuiz(Pageable pageable) {
        return null;
    }

    @Override
    public TakenQuizAverageScore getAverageQuizScore(UUID quizId) {
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        if (quiz.isPresent()) {
            List<TakeQuiz> takeQuizList = takeQuizRepository.findAllByQuizReference_QuizId(quizId);
            double average = 0;
            for (TakeQuiz takeQuiz : takeQuizList) {
                average += takeQuiz.getScore();
            }
            return TakenQuizAverageScore.builder()
                    .avgScore(average/takeQuizList.size())
                    .quizId(quiz.get().getQuizId())
                    .build();
        }
        throw new NoSuchElementException(
                MessageFormat.format("Take quiz with id {0} not found", quizId));
    }

    //  crated a TakenQuiz
    @Override
    public UUID takenQuizSubmit(TakeQuizDTO takeQuizDTO) {
        Optional<Quiz> quizOptional = quizRepository.findById(takeQuizDTO.getTakeQuizId());
        Optional<User> userOptional = userRepository.findById(takeQuizDTO.getUserId());
        if (quizOptional.isPresent()) {
            log.debug("Starting the creation of a new Take Quiz");
            TakeQuiz takeQuiz = takeQuizRepository.saveAndFlush(
                    TakeQuiz.builder()
                            .takenBy(userOptional.get())
                            .quizReference(quizOptional.get())
                            .score(takeQuizDTO.getScore())
                            .startedAt(takeQuizDTO.getStartedAt())
                            .finishedAt(takeQuizDTO.getFinishedAt())
                            .build()
            );
            log.debug("Finishing the creation of a new take quiz");
            return takeQuiz.getTakeQuizId();
        }
        throw new NoSuchElementException(
                MessageFormat.format("Take quiz with id {0} not found or user not found", takeQuizDTO.getUserId()));
    }

//    For now dont need user to delete the quiz they have taken
//    For future, implement a way to delete the oldest taken Quiz ~ taken 1 month ago.
//      can use the scheduler already implemented

//    @Override
//    public boolean deleteTakenQuiz(TakeQuizId takeQuizId) throws NoSuchElementException {
//        if (takeQuizRepository.existsById(takeQuizId)) {
//            log.debug("Taken Quiz found not deleting taken quiz with UUIDs of QUIZID: " +
//                    takeQuizId.getQuizId() + " USERID: " + takeQuizId.getUserId());
//            takeQuizRepository.deleteById(takeQuizId);
//            log.debug("The taken quiz has been deleted");
//            return true;
//        }
//        throw new NoSuchElementException(
//                MessageFormat.format("Take Quiz with Id {0} not found", takeQuizId.getQuizId()));
//    }


//    Dont really need to update taken quiz, Retaking a quiz will create a new entry
//    @Override
//    public TakeQuizDTO updateTakenQuiz(TakeQuizDTO takeQuizDTO) {
//        TakeQuizId takeQuizId = new TakeQuizId(takeQuizDTO.getUserId(), takeQuizDTO.getQuizId());
//        Optional<TakeQuiz> optionalTakeQuizUpdate = takeQuizRepository.findById(takeQuizId);
//        if (optionalTakeQuizUpdate.isPresent()) {
//            log.debug("Updating the take quiz");
//            TakeQuiz takeQuiz = optionalTakeQuizUpdate.get();
//            takeQuiz.setScore(takeQuizDTO.getScore());
//            takeQuiz.setStartedAt(takeQuizDTO.getStartedAt());
//            takeQuiz.setFinishedAt(takeQuizDTO.getFinishedAt());
//            log.debug("saving updated take quiz");
//            takeQuizRepository.saveAndFlush(takeQuiz);
//            log.debug("returning updated take quiz dto");
//            return takeQuizDTO;
//        }
//        throw new NoSuchElementException(MessageFormat.format("Take quiz with id {0} not found", takeQuizDTO.getUserId()));
//    }
}
