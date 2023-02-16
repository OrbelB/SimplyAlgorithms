package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;

import java.util.List;
import java.util.UUID;

public class QuizQuestionServiceImp implements QuizQuestionService{
    @Override
    public QuizQuestionDTO createQuizQuestion(QuizQuestionDTO quizQuestionDTO) {
        return null;
    }

    @Override
    public QuizQuestionDTO updateQuizQuestion(QuizQuestionDTO quizQuestionDTO) {
        return null;
    }

    @Override
    public boolean deleteQuizQuestion(UUID questionId) {
        return false;
    }

    @Override
    public List<QuizQuestionDTO> getAllQuizQuestion(UUID QuizId) {
        return null;
    }

    @Override
    public QuizQuestionDTO getQuizQuestion(UUID quizId, UUID questionId) {
        return null;
    }
}
