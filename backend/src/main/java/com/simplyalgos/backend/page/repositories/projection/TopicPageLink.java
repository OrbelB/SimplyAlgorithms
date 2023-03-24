package com.simplyalgos.backend.page.repositories.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface TopicPageLink {

    @Value("#{target.topicPage.pageId}")
    UUID getPageId();

    @Value("#{target.topicPage.title}")
    String getTitle();

    @Value("#{target.topicPage.urlPath}")
    String getUrlPath();
}
