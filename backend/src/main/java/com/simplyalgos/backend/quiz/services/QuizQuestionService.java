package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.quizId.QuizQuestionId;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface QuizQuestionService {

    List<QuizQuestionDTO> createAllQuizQuestionAndAnswers(List<QuizQuestionDTO> quizQuestionDTOList, UUID quizId);

    UUID createQuizQuestion(QuizQuestionDTO quizQuestionDTO);

    List<QuizQuestionDTO> updateAllQuizQuestions(List<QuizQuestionDTO> quizQuestionDTOList);
    QuizQuestionDTO updateQuizQuestionAndAnswers(QuizQuestionDTO quizQuestionDTO);
    boolean deleteQuizQuestion(UUID questionId);

    boolean deleteAllQuizQuestions(UUID quizId);


    List<QuizQuestionDTO> getAllQuizQuestion(UUID quizId);
    QuizQuestionDTO getQuizQuestion(UUID quizId, UUID questionId);

}
