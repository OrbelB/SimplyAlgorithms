package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.TakeQuizAverage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface TakeQuizAverageRepository
        extends JpaRepository<TakeQuizAverage, UUID> {

    <T> Page<T> findAllByUser_UserId(UUID userId, Pageable pageable, Class<T> type);

    boolean existsByUser_UserIdAndReferenceQuizForAvgScore_QuizId(UUID userId, UUID quizId);

    Optional<TakeQuizAverage> findByReferenceQuizForAvgScore_QuizIdAndUser_UserId
            (UUID quizId, UUID userId);

    void deleteAllByUser_UserId(UUID userId);

    void deleteByUser_UserIdAndReferenceQuizForAvgScore_QuizId(UUID userId, UUID quizId);

}
