package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;

import java.util.List;
import java.util.UUID;

public class QuizQuestionAnswerServiceImp implements QuizQuestionAnswerService{
    @Override
    public QuizQuestionAnswerDTO createQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO) {
        return null;
    }

    @Override
    public QuizQuestionAnswerDTO updateQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO) {
        return null;
    }

    @Override
    public boolean deleteQuizQuestionAnswer(UUID quizQuestionAnsId) {
        return false;
    }

    @Override
    public List<QuizQuestionAnswerDTO> getAllQuizQuestionAnswer(UUID questionId) {

        return null;
    }

    @Override
    public QuizQuestionAnswerDTO getQuizQuestionAnswer(UUID answerId, UUID questionId) {
        return null;
    }
}
