package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface QuizQuestionService {

    ResponseEntity<?> createQuizQuestion(QuizQuestionDTO quizQuestionDTO);
    ResponseEntity<?> updateQuizQuestion(QuizQuestionDTO quizQuestionDTO);
    ResponseEntity<?> deleteQuizQuestion(UUID questionId);

    ResponseEntity<?> getAllQuizQuestion(UUID QuizId);
    ResponseEntity<?> getQuizQuestion(UUID quizId, UUID questionId);

}
