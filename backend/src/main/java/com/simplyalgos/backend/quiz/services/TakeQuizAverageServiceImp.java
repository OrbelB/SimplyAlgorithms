package com.simplyalgos.backend.quiz.services;


import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.domains.TakeQuizAverage;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import com.simplyalgos.backend.quiz.dtos.TakenQuizzesDashboardDTO;
import com.simplyalgos.backend.quiz.mappers.QuizMapper;
import com.simplyalgos.backend.quiz.repositories.TakeQuizAverageRepository;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.sql.Time;
import java.sql.Timestamp;
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
    public boolean recordFunctionSelector(TakeQuizDTO takeQuizDTO){
        if(!takeQuizAverageRepository.existsByUser_UserIdAndReferenceQuizForAvgScore_QuizId(takeQuizDTO.getUserId(), takeQuizDTO.getQuizId())){
            return createRecord(takeQuizDTO);
        }
        return recordAverage(takeQuizDTO);
//        clunk
    }

    @Override
    public boolean createRecord(TakeQuizDTO takeQuizDTO){
        if(!takeQuizAverageRepository.existsByUser_UserIdAndReferenceQuizForAvgScore_QuizId
                (takeQuizDTO.getUserId(), takeQuizDTO.getQuizId())){
            throw new NoSuchElementException ("Record already exists for quiz ");
        }
        double runTime = getTimeDiff(takeQuizDTO);
        takeQuizAverageRepository.saveAndFlush(
                TakeQuizAverage
                        .builder()
                        .avgTime(takeQuizDTO.getScore())
                        .lowestScore(takeQuizDTO.getScore())
                        .highestScore(takeQuizDTO.getScore())
                        .bestTime(runTime)
                        .worstTime(runTime)
                        .avgTime(runTime)
                        .attempts(1)
                        .user(userService.getUser(takeQuizDTO.getUserId()))
                        .referenceQuizForAvgScore(quizService.getQuiz(takeQuizDTO.getQuizId()))
                        .build());

        return true;
    }

    @Override
    public boolean recordAverage(TakeQuizDTO takeQuizDTO) {
        Optional<TakeQuizAverage> takeQuizAverage = takeQuizAverageRepository
                .findByReferenceQuizForAvgScore_QuizIdAndUser_UserId(takeQuizDTO.getQuizId(), takeQuizDTO.getUserId());
        if(takeQuizAverage.isPresent()){
            throw new NoSuchElementException(MessageFormat.format("Take quiz record for user id {0} not found",
                    takeQuizDTO.getUserId()));
        }

        double runTime = getTimeDiff(takeQuizDTO);

        double updatedScoreAverage = addToAverage(takeQuizAverage.get().getAvgScore()
                , takeQuizAverage.get().getAttempts()
                , takeQuizDTO.getScore());

        double updateTimeAvg = addToAverage(takeQuizAverage.get().getAvgTime()
                , takeQuizAverage.get().getAttempts()
                , runTime);

        takeQuizAverage.get().setAvgScore(updatedScoreAverage);
        takeQuizAverage.get().setAvgTime(updateTimeAvg);

        takeQuizAverage.get().setAttempts(takeQuizAverage.get().getAttempts() + 1);

        if(takeQuizAverage.get().getHighestScore() < takeQuizDTO.getScore()){
            takeQuizAverage.get().setHighestScore(takeQuizDTO.getScore());
        }
        else if(takeQuizAverage.get().getLowestScore() > takeQuizDTO.getScore()){
            takeQuizAverage.get().setLowestScore(takeQuizDTO.getScore());
        }
        if(takeQuizAverage.get().getBestTime() < runTime){
            takeQuizAverage.get().setBestTime(runTime);
        }
        else if(takeQuizAverage.get().getWorstTime() > runTime){
            takeQuizAverage.get().setWorstTime(runTime);
        }
        takeQuizAverageRepository.saveAndFlush(takeQuizAverage.get());
        return true;
    }

    @Override
    public boolean resetAverageQuizScore(UUID avgTakeQuizId) {
        Optional<TakeQuizAverage> takeQuizAverage =
                takeQuizAverageRepository.findById(avgTakeQuizId);
        if(!takeQuizAverage.isPresent()){
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
                new NoSuchElementException(MessageFormat.format("Record with avgTakeQuizId {0} not found",avgTakeQuizId))
        ));
    }

    @Override
    public ObjectPagedList<?> getTakeQuizAverageList(UUID userId, Pageable pageable) {
        Page<TakeQuizAverage> takeQuizAverages = takeQuizAverageRepository
                .findAllByUser_UserId(userId, pageable);
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
        Optional<TakeQuizAverage> takeQuizAverage =  takeQuizAverageRepository.findByReferenceQuizForAvgScore_QuizIdAndUser_UserId(quizId,userId);
        if(takeQuizAverage.isPresent()){
            takeQuizAverage.get().getAvgTakeQuizId();
        }
        return null;
    }


    private double addToAverage(double average, int size, double value)
    {
        return (size * average + value) / (size + 1);
    }

    private double getTimeDiff(TakeQuizDTO takeQuiz){
        long mill = takeQuiz.getStartedAt().getTime() - takeQuiz.getFinishedAt().getTime();
        int min = (int) (mill / 60000);
        return (min < 0) ? ((-1)*min) : min;
    }

}
