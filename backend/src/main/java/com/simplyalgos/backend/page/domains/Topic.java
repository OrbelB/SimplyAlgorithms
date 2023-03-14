package com.simplyalgos.backend.page.domains;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.utils.JsonToStringConverter;
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
    @Convert(converter = JsonToStringConverter.class)
    @Column(name = "page_description", columnDefinition = "json")
    private Map<String, Object> pageDescription;
    private String source;
    private Integer upVotes;
    private Integer downVotes;

    @JsonIncludeProperties({"userId", "username"})
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User createdBy;

    @Builder
    public Topic(UUID pageId, Date createdDate, String title, String video, Map<String, Object> pageDescription, String source, Integer upVotes, Integer downVotes, User createdBy, PageEntity pageEntityId, List<TopicSteps> topicSteps, List<TopicExternalResource> topicExternalResources, List<CodeSnippet> codeSnippets, List<WikiTopicPage> parentTopicIds) {
        super(pageId, createdDate, title);
        this.video = video;
        this.pageDescription = pageDescription;
        this.source = source;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.createdBy = createdBy;
        this.pageEntityId = pageEntityId;
        this.topicSteps = topicSteps;
        this.topicExternalResources = topicExternalResources;
        this.codeSnippets = codeSnippets;
        this.parentTopicIds = parentTopicIds;
    }

    @JsonIncludeProperties({"tags", "pageComments", "parentTopicIds", "childrenTopicIds"})
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "page_id", nullable = false)
    private PageEntity pageEntityId;

    @OneToMany(mappedBy = "topicPage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TopicSteps> topicSteps = new ArrayList<>();

    @OneToMany(mappedBy = "externalTopicPage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<TopicExternalResource> topicExternalResources = new ArrayList<>();

    @OneToMany(mappedBy = "topicPage", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CodeSnippet> codeSnippets;

    @OneToMany(mappedBy = "topicPage", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<WikiTopicPage> parentTopicIds = new ArrayList<>();

}
