package com.simplyalgos.backend.page.repositories.projection;

import com.simplyalgos.backend.comment.repositories.projections.UserInfoOnly;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

public interface TopicInformation {

    @Value("#{target.pageId}")
    UUID getPageId();

    @Value("#{target.title}")
    String getTitle();


    @Value("#{target.createdDate}")
    Date getCreatedDate();

    @Value("#{target.visualizer}")
    String getVisualizer();

    @Value("#{target.source}")
    String getSource();

    @Value("#{target.video}")
    String getVideo();

    @Value("#{target.pageDescription}")
    Map<String, Object> getPageDescription();

    @Value("#{target.urlPath}")
    String getUrlPath();

    @Value("#{target.createdBy}")
    UserInfoOnly getCreatedBy();

    @Value("#{target.topicExternalResources}")
    Set<TopicExternalResourcesInfo> getTopicExternalResources();


    @Value("#{target.codeSnippets}")
    Set<CodeSnippetInfo> getCodeSnippets();

    @Value("#{target.getUpVotes}")
    Integer getUpVotes();

    @Value("#{target.getDownVotes}")
    Integer getDownVotes();


}
