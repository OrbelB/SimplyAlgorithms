package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.QuestionAnswer;
import com.simplyalgos.backend.quiz.domains.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.UUID;

public interface QuizQuestionAnswerRepository extends JpaRepository<QuestionAnswer, UUID> {
}
