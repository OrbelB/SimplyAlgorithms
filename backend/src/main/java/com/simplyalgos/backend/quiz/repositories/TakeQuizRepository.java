package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.domains.quizId.TakeQuizId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TakeQuizRepository extends JpaRepository<TakeQuiz, UUID> {

    List<TakeQuiz> findAllByQuizReference_QuizId(UUID quizId);

    Optional<TakeQuiz> findByTakeQuizIdAndTakenBy_UserIdAndQuizReference_QuizId(UUID takeQuizId,
                                                                                UUID quizId, UUID userId);
    List<TakeQuiz> findAllByTakeQuizIdAndQuizReference_QuizId(UUID takenQuizId,
                                                                   UUID quizId);
}
