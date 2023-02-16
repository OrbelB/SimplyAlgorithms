package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.page.domains.PageVoteId;
import com.simplyalgos.backend.page.dtos.LikeDislikeDTO;
import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.quiz.repositories.QuizRepository;
import com.simplyalgos.backend.tag.services.TagService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.query.spi.QueryImplementor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class QuizServiceImp implements QuizService {

    private final QuizRepository quizRepository;
    private final UserService userService;
    private final TagService tagService;

    @Override
    public ObjectPagedList<?> listQuizPages(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList filterQuiByTag(Pageable pageable, String tag) {
        return null;
    }

    @Override
    public UUID createQuiz(QuizDTO quizDTO) {
        return null;
    }

    @Override
    public UUID deleteQuiz(UUID quizId, UUID userId) {
        return null;
    }

    @Override
    public QuizDTO updateQuiz(QuizDTO quizDTO) {
        return null;
    }

    @Override
    public QuizDTO getQuiz(UUID quizId) {
        return null;
    }

    @Override
    public void addToQuizTaken(UUID quizId, UUID userId) {

    }

    @Override
    public LikeDislikeDTO userLikedOrDisliked(UUID userId, UUID pageId, boolean passedLikeDislike) {
        return null;
    }

    @Override
    public ResponseEntity<?> getAverageUserQuizScore(UUID userId) {
        return null;
    }

    @Override
    public PageVoteId deleteVote(UUID userId, UUID quizId) {
        return null;
    }
}
