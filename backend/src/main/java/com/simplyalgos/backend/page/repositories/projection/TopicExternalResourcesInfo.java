package com.simplyalgos.backend.page.repositories.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface TopicExternalResourcesInfo {

    @Value("#{target.topicExternalResourceId.externalResourceLink}")
    String getExternalResourceLink();

    @Value("#{target.title}")
    String getTitle();
    @Value("#{target.topicExternalResourceId.pageId}")
    UUID getPageId();
}
