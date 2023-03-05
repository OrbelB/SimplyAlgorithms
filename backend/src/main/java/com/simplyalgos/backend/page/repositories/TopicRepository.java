package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;
import java.util.UUID;

public interface TopicRepository extends JpaRepository<Topic, UUID> {

    <T> Set<T> findAllByPageIdNotIn(Set<UUID> topicId, Class<T> type);

    boolean existsByTitle(String title);


}
