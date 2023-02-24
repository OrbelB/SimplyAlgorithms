package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.domains.quizId.TakeQuizId;
import com.simplyalgos.backend.quiz.dtos.QuizScoreDTO;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import com.simplyalgos.backend.quiz.dtos.TakenQuizAverageScore;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.UUID;

public interface TakeQuizService {

    //will return a list containing the start and finish time
    TakeQuizDTO getTimeStamp(TakeQuizDTO takeQuizDTO) throws NoSuchMethodException;

    List<TakeQuizDTO> getAllUserQuizScore(UUID userId, UUID quizId);

    ObjectPagedList getAllUserTakenQuizByQuizId(Pageable pageable, String userId, String quizId);

    ObjectPagedList getAllUserTakenQuiz(Pageable pageable, String userId);

    List<TakeQuizDTO> getAllQuizzesTakenByUser(UUID userId);


    TakenQuizAverageScore getAverageQuizScore(UUID quizId);


    UUID createTakenQuiz(TakeQuizDTO takeQuizDTO);

//    will delete everything
    UUID deleteAllUserTakeQuizHistory(UUID userId);

//    will delete quizzes taken a month ago.
//    will delete based on finished time stamp.
    UUID deleteOldUserTakenQuizHistory(UUID userId);
}
