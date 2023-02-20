package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.quizId.QuestionAnswerId;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface QuizQuestionAnswerService {
    QuizQuestionAnswerDTO createQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO);


    void saveAllQuizQuestionAnswers(QuizQuestionDTO quizQuestionDTO);

    void updateAllQuizQuestionAnswers(QuizQuestionDTO quizQuestionDTO);

    QuizQuestionAnswerDTO updateQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO);
    boolean deleteQuizQuestionAnswer(QuestionAnswerId questionAnswerId);

    //will return a list<QuizQuestionAnswerDTO>
    List<QuizQuestionAnswerDTO> getAllQuizQuestionAnswer(UUID questionId);
    QuizQuestionAnswerDTO getQuizQuestionAnswer(UUID answerId, UUID questionId);

}
