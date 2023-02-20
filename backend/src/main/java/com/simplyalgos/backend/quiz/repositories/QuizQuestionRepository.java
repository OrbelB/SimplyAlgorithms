package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.QuizQuestion;
import com.simplyalgos.backend.quiz.domains.quizId.QuizQuestionId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, UUID> {

    void deleteAllByBelongsToThisQuiz(UUID quizId);
    boolean existsByBelongsToThisQuiz(UUID quizID);
    @Query(nativeQuery = true, value = "SELECT * FROM quiz_question WHERE quiz_id = :quiz_id")
    List<QuizQuestion> findAllByQuizId(@Param("quiz_id") String quizId);
}
