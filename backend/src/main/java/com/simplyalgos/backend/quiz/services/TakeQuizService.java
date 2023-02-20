package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.domains.quizId.TakeQuizId;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;

import java.util.List;
import java.util.UUID;

public interface TakeQuizService {

    //will return a list containing the start and finish time
    TakeQuizDTO getTimeStamp(TakeQuizId takeQuizId) throws NoSuchMethodException;
    int getUserQuizScore(TakeQuizId takeQuizId) throws NoSuchMethodException;
    List<TakeQuizDTO> getAllUserQuizScore(UUID userId);

    double getAverageUserQuizScore(UUID userId);

    double getAllAverageQuizScore(UUID quizId);


    TakeQuizDTO createTakenQuiz(TakeQuizDTO takeQuizDTO);
    boolean deleteTakenQuiz(TakeQuizId takeQuizId) throws NoSuchMethodException;
    TakeQuizDTO updateTakenQuiz(TakeQuizDTO takeQuizDTO);
}
