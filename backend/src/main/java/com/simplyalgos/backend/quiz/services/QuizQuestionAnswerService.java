package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;

import java.util.List;
import java.util.UUID;

public interface QuizQuestionAnswerService {
    QuizQuestionAnswerDTO createQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO);


    void saveAllQuizQuestionAnswers(QuizQuestionDTO quizQuestionDTO);

    void updateAllQuizQuestionAnswers(QuizQuestionDTO quizQuestionDTO);

    QuizQuestionAnswerDTO updateQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO);
    boolean deleteQuizQuestionAnswer(UUID questionAnswerId);

    //will return a list<QuizQuestionAnswerDTO>
    List<QuizQuestionAnswerDTO> getAllQuizQuestionAnswer(UUID questionId);
    QuizQuestionAnswerDTO getQuizQuestionAnswer(UUID answerId, UUID questionId);

    void removeMissingQuestionAnswers(List<UUID> answerIds, UUID questionId);

}
