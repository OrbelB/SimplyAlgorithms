package com.simplyalgos.backend.quiz.services;


import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.domains.TakeQuizAverage;
import com.simplyalgos.backend.quiz.dtos.TakenQuizzesDashboardDTO;
import com.simplyalgos.backend.quiz.mappers.QuizMapper;
import com.simplyalgos.backend.quiz.repositories.TakeQuizAverageRepository;
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
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class TakeQuizAverageServiceImp implements TakeQuizAverageService {

    private final TakeQuizAverageRepository takeQuizAverageRepository;
    private final UserService userService;
    private final QuizService quizService;

    private final QuizMapper quizMapper;

    @Override
    public boolean recordFunctionSelector(TakeQuiz takeQuizDTO) {
        if (!takeQuizAverageRepository.existsByUser_UserIdAndReferenceQuizForAvgScore_QuizId(takeQuizDTO.getTakenBy().getUserId(), takeQuizDTO.getQuizReference().getQuizId())) {
            log.debug("Creating a quiz record");
            return createRecord(takeQuizDTO);
        }
        log.debug("updating thr quiz record");
        return recordAverage(takeQuizDTO);
//        clunk
    }

    @Override
    public boolean createRecord(TakeQuiz takeQuizDTO) {
        if(takeQuizAverageRepository.existsByUser_UserIdAndReferenceQuizForAvgScore_QuizId
                (takeQuizDTO.getTakenBy().getUserId(), takeQuizDTO.getQuizReference().getQuizId())){
            throw new NoSuchElementException ("Record already exists for quiz ");
        }
        log.debug("Create record take quiz DTO ");
        double runTime = getTimeDiff(takeQuizDTO);
        TakeQuizAverage takeQuizAverage =  takeQuizAverageRepository.saveAndFlush(
                TakeQuizAverage
                        .builder()
                        .avgScore(takeQuizDTO.getScore())
                        .lowestScore(takeQuizDTO.getScore())
                        .highestScore(takeQuizDTO.getScore())
                        .bestTime(runTime)
                        .worstTime(runTime)
                        .avgTime(runTime)
                        .attempts(1)
                        .user(userService.getUser(takeQuizDTO.getTakenBy().getUserId()))
                        .referenceQuizForAvgScore(quizService.getQuiz(takeQuizDTO.getQuizReference().getQuizId()))
                        .build());

        log.debug("Create record Saved object" );

        return true;
    }

    @Override
    public boolean recordAverage(TakeQuiz takeQuizDTO) {
        TakeQuizAverage takeQuizAverage = takeQuizAverageRepository
                .findByReferenceQuizForAvgScore_QuizIdAndUser_UserId(
                        takeQuizDTO.getQuizReference().getQuizId(),
                        takeQuizDTO.getTakenBy().getUserId()
                ).orElseThrow(() -> new NoSuchElementException(
                        MessageFormat
                                .format("Take quiz record for user id {0} not found",
                takeQuizDTO.getTakenBy().getUserId())));
        double runTime = getTimeDiff(takeQuizDTO);

        double updatedScoreAverage = addToAverage(takeQuizAverage.getAvgScore()
                , takeQuizAverage.getAttempts()
                , takeQuizDTO.getScore());

        double updateTimeAvg = addToAverage(takeQuizAverage.getAvgTime()
                , takeQuizAverage.getAttempts()
                , runTime);

        takeQuizAverage.setAvgScore(updatedScoreAverage);
        takeQuizAverage.setAvgTime(updateTimeAvg);

        takeQuizAverage.setAttempts(takeQuizAverage.getAttempts() + 1);

        if (takeQuizAverage.getHighestScore() < takeQuizDTO.getScore()) {
            takeQuizAverage.setHighestScore(takeQuizDTO.getScore());
        } else if (takeQuizAverage.getLowestScore() > takeQuizDTO.getScore()) {
            takeQuizAverage.setLowestScore(takeQuizDTO.getScore());
        }
        if (takeQuizAverage.getBestTime() < runTime) {
            takeQuizAverage.setBestTime(runTime);
        } else if (takeQuizAverage.getWorstTime() > runTime) {
            takeQuizAverage.setWorstTime(runTime);
        }
        takeQuizAverageRepository.saveAndFlush(takeQuizAverage);
        return true;
    }

    @Override
    public boolean resetAverageQuizScore(UUID avgTakeQuizId) {
        Optional<TakeQuizAverage> takeQuizAverage =
                takeQuizAverageRepository.findById(avgTakeQuizId);
        if (!takeQuizAverage.isPresent()) {
            throw new NoSuchElementException(MessageFormat.format("Take quiz record with avgTakeQuizId {0} not found",
                    avgTakeQuizId));
        }
        takeQuizAverageRepository.deleteById(avgTakeQuizId);
        return true;
    }

    @Override
    public boolean resetAverageQuizScore(UUID userId, UUID quizId) {
        takeQuizAverageRepository.deleteByUser_UserIdAndReferenceQuizForAvgScore_QuizId(userId, quizId);
        return true;
    }

    @Override
    public void resetAllAverageQuizScore(UUID userId) {
        takeQuizAverageRepository.deleteAllByUser_UserId(userId);
    }

    @Override
    public TakenQuizzesDashboardDTO getAverageQuizScore(UUID avgTakeQuizId) {
        return quizMapper.takeQuizAverageToTakeQuizzesDashboardDTO(takeQuizAverageRepository.findById(avgTakeQuizId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("Record with avgTakeQuizId {0} not found", avgTakeQuizId))
        ));
    }

    @Override
    public ObjectPagedList<?> getTakeQuizAverageList(UUID userId, Pageable pageable) {
        Page<TakeQuizAverage> takeQuizAverages = takeQuizAverageRepository
                .findAllByUser_UserId(userId, pageable, TakeQuizAverage.class);
        return new ObjectPagedList<>(
                takeQuizAverages.stream()
                        .map(quizMapper::takeQuizAverageToTakeQuizzesDashboardDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        takeQuizAverages.getPageable().getPageNumber(),
                        takeQuizAverages.getPageable().getPageSize(),
                        takeQuizAverages.getSort()),
                takeQuizAverages.getTotalElements()
        );
    }

    @Override
    public UUID getTakeQuizAverageId(UUID quizId, UUID userId) {
        Optional<TakeQuizAverage> takeQuizAverage = takeQuizAverageRepository.findByReferenceQuizForAvgScore_QuizIdAndUser_UserId(quizId, userId);
        takeQuizAverage.ifPresent(TakeQuizAverage::getAvgTakeQuizId);
        return null;
    }


    private double addToAverage(double average, int size, double value) {
        return (size * average + value) / (size + 1);
    }

    private double getTimeDiff(TakeQuiz takeQuiz) {
        long mill = takeQuiz.getStartedAt().getTime() - takeQuiz.getFinishedAt().getTime();
        int min = (int) (mill / 60000);
        return (min < 0) ? ((-1) * min) : min;
    }

}
