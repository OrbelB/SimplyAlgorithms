package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.QuestionAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface QuizQuestionAnswerRepository extends JpaRepository<QuestionAnswer, UUID> {

    List<QuestionAnswer> findAllByAnswerBelongsToQuestion_QuestionId(UUID questionId);

}
