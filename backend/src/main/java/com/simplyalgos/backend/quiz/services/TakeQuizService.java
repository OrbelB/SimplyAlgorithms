package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface TakeQuizService {

    //will return a list containing the start and finish time
    ResponseEntity<?> getTimeStamp(UUID userId, UUID quizId);
    ResponseEntity<?> getUserQuizScore(UUID userId, UUID quizId);
    ResponseEntity<?> getAllUserQuizScore(UUID userId);


    ResponseEntity<?> createTakenQuiz(TakeQuizDTO takeQuizDTO);
    ResponseEntity<?> deleteTakenQuiz(UUID userId, UUID quizId);
    ResponseEntity<?> updateTakenQuiz(TakeQuizDTO takeQuizDTO);
}
