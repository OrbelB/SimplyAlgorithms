package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuizRepository extends JpaRepository<Quiz, UUID> {
}
