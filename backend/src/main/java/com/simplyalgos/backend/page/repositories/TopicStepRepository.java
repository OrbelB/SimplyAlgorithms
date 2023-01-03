package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.TopicSteps;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TopicStepRepository extends JpaRepository<TopicSteps, UUID> {
}
