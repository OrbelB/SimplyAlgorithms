package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.QuizScoreDTO;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import org.springframework.http.ResponseEntity;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

public interface TakeQuizService {

    //will return a list containing the start and finish time
    List<Timestamp> getTimeStamp(UUID userId, UUID quizId);
    int getUserQuizScore(UUID userId, UUID quizId);
    List<QuizScoreDTO> getAllUserQuizScore(UUID userId);


    TakeQuizDTO createTakenQuiz(TakeQuizDTO takeQuizDTO);
    boolean deleteTakenQuiz(UUID userId, UUID quizId);
    TakeQuizDTO updateTakenQuiz(TakeQuizDTO takeQuizDTO);
}
