package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.QuizScoreDTO;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

public class TakeQuizServiceImp implements TakeQuizService{
    @Override
    public List<Timestamp> getTimeStamp(UUID userId, UUID quizId) {
        return null;
    }

    @Override
    public int getUserQuizScore(UUID userId, UUID quizId) {
        return 0;
    }

    @Override
    public List<QuizScoreDTO> getAllUserQuizScore(UUID userId) {
        return null;
    }

    @Override
    public TakeQuizDTO createTakenQuiz(TakeQuizDTO takeQuizDTO) {
        return null;
    }

    @Override
    public boolean deleteTakenQuiz(UUID userId, UUID quizId) {
        return false;
    }

    @Override
    public TakeQuizDTO updateTakenQuiz(TakeQuizDTO takeQuizDTO) {
        return null;
    }
}
