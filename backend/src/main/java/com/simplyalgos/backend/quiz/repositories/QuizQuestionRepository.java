package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, UUID> {
}
