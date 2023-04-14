package com.simplyalgos.backend.page.repositories.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface TopicNameAndLinkInformation {

    @Value("#{target.pageId}")
    UUID getPageId();

    @Value("#{target.title}")
    String getTitle();

    @Value("#{target.urlPath}")
    String getUrlPath();
}
