package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.dtos.FullQuizDTO;
import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;

import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface QuizService {

    ObjectPagedList<?> listQuizPages(Pageable pageable);

    ObjectPagedList<?> listQuizPagesByTitle(Pageable pageable, String title);

    ObjectPagedList listQuizPageWithTag(Pageable pageable, String tag);

    FullQuizDTO updateFullQuiz(FullQuizDTO fullQuizDTO);

    UUID createQuizWithFullQuizDTO(FullQuizDTO newFullQuiz);

    UUID deleteQuiz(UUID quizId);

    QuizDTO updateQuiz(QuizDTO quizDTO);

    QuizDTO getQuiz(UUID quizId);

    FullQuizDTO getFullQuiz(UUID quizId);
}
