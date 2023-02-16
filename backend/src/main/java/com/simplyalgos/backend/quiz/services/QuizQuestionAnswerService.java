package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface QuizQuestionAnswerService {
    ResponseEntity<?> createQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO);
    ResponseEntity<?> updateQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO);
    ResponseEntity<?> deleteQuizQuestionAnswer(UUID quizQuestionAnsId);

    //will return a list<QuizQuestionAnswerDTO>
    ResponseEntity<?> getAllQuizQuestionAnswer(UUID questionId);
    ResponseEntity<?> getQuizQuestionAnswer(UUID answerId, UUID questionId);

}
