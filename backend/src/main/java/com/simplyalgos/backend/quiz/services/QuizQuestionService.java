package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface QuizQuestionService {

    QuizQuestionDTO createQuizQuestion(QuizQuestionDTO quizQuestionDTO);
    QuizQuestionDTO updateQuizQuestion(QuizQuestionDTO quizQuestionDTO);
    boolean deleteQuizQuestion(UUID questionId);

    List<QuizQuestionDTO> getAllQuizQuestion(UUID QuizId);
    QuizQuestionDTO getQuizQuestion(UUID quizId, UUID questionId);

}
