package com.simplyalgos.backend.page.repositories.projection;

import com.simplyalgos.backend.comment.repositories.projections.UserInfoOnly;
import com.simplyalgos.backend.tag.repositories.projections.TagInfoOnly;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;
import java.util.Set;
import java.util.UUID;

public interface ForumInformation {

    @Value("#{target.pageId}")
    UUID getPageId();

    @Value("#{target.title}")
    String getTitle();

    @Value("#{target.descriptionText}")
    String getDescriptionText();

    @Value("#{target.getPhoto}")
    String getPhoto();

    @Value("#{target.getVideo}")
    String getVideo();

    @Value("#{target.getUpVotes}")
    int getUpVotes();

    @Value("#{target.getDownVotes}")
    int getDownVotes();


    @Value("#{target.getCreatedBy}")
    UserInfoOnly getUserDto();

    @Value("#{target.getCreatedDate}")
    Date getCreatedDate();


    @Value("#{target.getPageEntityId.tags}")
    Set<TagInfoOnly> getTags();





}
