package com.simplyalgos.backend.quiz.repositories;

import com.simplyalgos.backend.quiz.domains.Quiz;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface QuizRepository extends JpaRepository<Quiz, UUID> {

    <T> Page<T> findAllByTagId_TagId(UUID tag, Pageable pageable, Class<T> type);

    <T> Page<T> findAllProjectedBy(Pageable pageable, Class<T> type);

    <T> Page<T> findAllByTitleStartingWith(String title, Pageable pageable,Class<T> type);

    Page<Quiz> findAllByTitleLike(String title, Pageable pageable);
    Page<Quiz> findAllByTitleContaining(String title, Pageable pageable);
}
