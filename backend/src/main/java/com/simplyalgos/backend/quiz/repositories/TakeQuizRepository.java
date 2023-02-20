package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.domains.quizId.TakeQuizId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TakeQuizRepository extends JpaRepository<TakeQuiz, TakeQuizId> {

    @Query(nativeQuery = true, value = "SELECT * FROM take_quiz WHERE user_id = :user_id")
    List<TakeQuiz> findAllByUserId(@Param("user_id") String userId);

    @Query(nativeQuery = true, value = "SELECT * FROM take_quiz WHERE quiz_id = :quiz_id")
    List<TakeQuiz> findAllByQuizId(@Param("quiz_id") String quizId);

    //    @Query(nativeQuery = true, value = "SELECT CASE WHEN quiz_id = :quiz_id AND user_id = :user_id THEN true ELSE false END;")
//    boolean existsByUserIdAndQuizId(@Param("quiz_id") String quizId, @Param("user_id") String userId);
}
