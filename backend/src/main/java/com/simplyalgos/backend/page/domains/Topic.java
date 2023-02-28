package com.simplyalgos.backend.page.domains;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import jakarta.persistence.*;
import java.util.*;

@Setter
@Getter
@NoArgsConstructor
@Entity(name = "topic_page")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "pageId")
public class Topic extends BaseEntity {
    private String video;

    @Column(name = "running_time")
    private String runningTime;

    @Column(name = "time_complexity")
    private String timeComplexity;

    private String explanation;

    private Integer upVotes;

    private Integer downVotes;

    @Builder
    public Topic(UUID pageId, Date createdDate, String title, String video, String runningTime, String timeComplexity, String explanation, Integer upVotes, Integer downVotes, PageEntity pageEntityId, List<TopicSteps> topicSteps, List<TopicExternalResource> topicExternalResources, List<CodeSnippet> codeSnippets) {
        super(pageId, createdDate, title);
        this.video = video;
        this.runningTime = runningTime;
        this.timeComplexity = timeComplexity;
        this.explanation = explanation;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.pageEntityId = pageEntityId;
        this.topicSteps = topicSteps;
        this.topicExternalResources = topicExternalResources;
        this.codeSnippets = codeSnippets;
    }


    @JsonIncludeProperties({"tags", "pageComments", "parentTopicIds", "childrenTopicIds"})
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "page_id", nullable = false)
    private PageEntity pageEntityId;

    @OneToMany(mappedBy = "topicPage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TopicSteps> topicSteps = new ArrayList<>();

    @OneToMany(mappedBy = "externalTopicPage", cascade = CascadeType.ALL , fetch = FetchType.LAZY)
    private List<TopicExternalResource> topicExternalResources = new ArrayList<>();

    @OneToMany(mappedBy = "topicPage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CodeSnippet> codeSnippets;

    @OneToMany(mappedBy = "topicPage", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<WikiTopicPage> parentTopicIds = new ArrayList<>();

}
