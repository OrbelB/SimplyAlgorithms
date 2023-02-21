package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.page.domains.PageVote;
import com.simplyalgos.backend.page.domains.PageVoteId;
import com.simplyalgos.backend.page.dtos.LikeDislikeDTO;
import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.http.ResponseEntity;

import org.springframework.data.domain.Pageable;
import java.util.UUID;

public interface QuizService {

    ObjectPagedList<?> listQuizPages(Pageable pageable);

    ObjectPagedList listQuizPageWithTag(Pageable pageable, String tag);

    UUID createQuiz(QuizDTO quizDTO);

    UUID deleteQuiz(UUID quizId);

    QuizDTO updateQuiz(QuizDTO quizDTO);

    QuizDTO getQuiz(UUID quizId);
}
