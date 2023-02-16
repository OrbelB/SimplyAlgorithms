package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TakeQuizRepository extends JpaRepository<TakeQuiz, UUID> {
}
