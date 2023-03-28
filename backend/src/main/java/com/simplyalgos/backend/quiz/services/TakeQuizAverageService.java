package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.dtos.TakenQuizzesDashboardDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TakeQuizAverageService {

    boolean recordFunctionSelector(TakeQuiz takeQuizDTO);

//  create
    boolean createRecord(TakeQuiz takeQuizDTO);

//  Update
    boolean recordAverage(TakeQuiz takeQuizDTO);

    boolean resetAverageQuizScore(UUID avgTakeQuizId);

    boolean resetAverageQuizScore(UUID userId, UUID quizId);

    void resetAllAverageQuizScore(UUID userId);

    TakenQuizzesDashboardDTO getAverageQuizScore(UUID avgTakeQuizId);

    ObjectPagedList getTakeQuizAverageList(UUID userId, Pageable pageable);

    UUID getTakeQuizAverageId(UUID quizId, UUID userId);




}
