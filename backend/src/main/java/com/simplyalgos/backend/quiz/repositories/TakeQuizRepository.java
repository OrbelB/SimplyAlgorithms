package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.domains.quizId.TakeQuizId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TakeQuizRepository extends JpaRepository<TakeQuiz, UUID> {


    List<TakeQuiz> findAllByTakenBy_UserId(UUID userId);
    List<TakeQuiz> findAllByQuizReference_QuizId(UUID quizId);

    Optional<TakeQuiz> findByTakeQuizIdAndTakenBy_UserIdAndQuizReference_QuizId(UUID takenQuizId,
                                                                                UUID userId,
                                                                                UUID quizId);

    List<TakeQuiz> findAllByTakenBy_UserIdAndQuizReference_QuizId(UUID userId,
                                                                  UUID quizId);


    Page<TakeQuiz> findAllByQuizReference_QuizIdAndTakenBy_UserId(UUID quizId,
                                                                  UUID userId,
                                                                  Pageable pageable);

    Page<TakeQuiz> findAllByQuizReference_TagId_TagIdAndTakenBy_UserId(UUID tagId,
                                                                       UUID userId,
                                                                       Pageable pageable);

    Page<TakeQuiz> findAllByTakenBy_UserId(UUID userId,
                                           Pageable pageable);

    void deleteAllByTakenBy_UserId(UUID userId);

    void deleteAllByTakenBy_UserIdAndQuizReference_QuizId(UUID userId, UUID quizId);

}
