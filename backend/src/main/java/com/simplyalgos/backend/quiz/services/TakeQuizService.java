package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.domains.quizId.TakeQuizId;
import com.simplyalgos.backend.quiz.dtos.QuizScoreDTO;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import com.simplyalgos.backend.quiz.dtos.TakenQuizAverageScore;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;

import java.awt.print.Pageable;
import java.util.List;
import java.util.UUID;

public interface TakeQuizService {

    //will return a list containing the start and finish time
    TakeQuizDTO getTimeStamp(TakeQuizDTO takeQuizDTO) throws NoSuchMethodException;

//    QuizScoreDTO getUserQuizScore(TakeQuizDTO takeQuizDTO) throws NoSuchMethodException;
    List<TakeQuizDTO> getAllUserQuizScore(UUID userId, UUID quizId);

    ObjectPagedList<?> getAllTakenQuiz(Pageable pageable);


    TakenQuizAverageScore getAverageQuizScore(UUID quizId);


    UUID takenQuizSubmit(TakeQuizDTO takeQuizDTO);
//    boolean deleteTakenQuiz(TakeQuizDTO takeQuizDTO) throws NoSuchMethodException;
//    TakeQuizDTO updateTakenQuiz(TakeQuizDTO takeQuizDTO);
}
