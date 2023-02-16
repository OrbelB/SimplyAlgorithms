package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface QuizQuestionAnswerService {
    QuizQuestionAnswerDTO createQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO);
    QuizQuestionAnswerDTO updateQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO);
    boolean deleteQuizQuestionAnswer(UUID quizQuestionAnsId);

    //will return a list<QuizQuestionAnswerDTO>
    List<QuizQuestionAnswerDTO> getAllQuizQuestionAnswer(UUID questionId);
    QuizQuestionAnswerDTO getQuizQuestionAnswer(UUID answerId, UUID questionId);

}
