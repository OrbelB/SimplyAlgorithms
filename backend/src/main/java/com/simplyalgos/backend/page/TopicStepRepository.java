package com.simplyalgos.backend.page;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TopicStepRepository extends JpaRepository<TopicSteps, UUID> {
}
