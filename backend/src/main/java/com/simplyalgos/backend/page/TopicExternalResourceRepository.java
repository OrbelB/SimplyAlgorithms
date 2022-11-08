package com.simplyalgos.backend.page;


import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.UUID;

public interface TopicExternalResourceRepository extends JpaRepository<TopicExternalResource, TopicExternalResourceId> {
    List<TopicExternalResource> findAllByTopicExternalResourceIdIsNotInAndTopicExternalResourceId_PageId(Collection<TopicExternalResourceId> topicExternalResourceId, UUID topicExternalResourceId_pageId);
}
