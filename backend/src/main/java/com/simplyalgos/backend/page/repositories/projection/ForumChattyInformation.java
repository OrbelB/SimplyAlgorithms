package com.simplyalgos.backend.page.repositories.projection;

import com.simplyalgos.backend.user.repositories.projections.UserAndUserIdOnly;
import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface ForumChattyInformation {

    @Value("#{target.pageId}")
    UUID getPageId();

    @Value("#{target.descriptionText}")
    String getDescriptionText();

    @Value("#{target.title}")
    String getTitle();


    @Value("#{target.createdBy}")
    UserAndUserIdOnly getCreatedBy();
}
