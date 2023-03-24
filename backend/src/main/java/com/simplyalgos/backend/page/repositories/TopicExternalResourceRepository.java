package com.simplyalgos.backend.page.repositories;


import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.domains.TopicExternalResource;
import com.simplyalgos.backend.page.domains.ids.TopicExternalResourceId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface TopicExternalResourceRepository extends JpaRepository<TopicExternalResource, TopicExternalResourceId> {
    List<TopicExternalResource> findAllByTopicExternalResourceIdIsNotInAndTopicExternalResourceId_PageId(
            Collection<TopicExternalResourceId> topicExternalResourceId,
            UUID topicExternalResourceId_pageId);


    void removeByTopicExternalResourceIdNotInAndTopicPage(Set<TopicExternalResourceId> topicExternalResourceId,
                                                       Topic topicPage);

}
