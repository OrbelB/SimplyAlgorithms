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

    @Column(name = "video", nullable = true)
    private String video;
    @Convert(converter = JsonToStringConverter.class)
    @Column(name = "page_description", columnDefinition = "json")
    private Map<String, Object> pageDescription;
    private String source;
    private Integer upVotes;
    private Integer downVotes;
    private String visualizer;
    @Column(name = "url_path")
    private String urlPath;

    @JsonIncludeProperties({"userId", "username"})
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User createdBy;

    @Builder
    public Topic(UUID pageId, Date createdDate, String title, String video, Map<String, Object> pageDescription, String source, Integer upVotes, Integer downVotes, String visualizer, String urlPath, User createdBy, PageEntity pageEntity, Set<TopicExternalResource> topicExternalResources, Set<CodeSnippet> codeSnippets, List<WikiTopicPage> parentTopicIds) {
        super(pageId, createdDate, title);
        this.video = video;
        this.pageDescription = pageDescription;
        this.source = source;
        this.upVotes = upVotes;
        this.downVotes = downVotes;
        this.visualizer = visualizer;
        this.urlPath = urlPath;
        this.createdBy = createdBy;
        this.pageEntity = pageEntity;
        this.topicExternalResources = topicExternalResources;
        this.codeSnippets = codeSnippets;
        this.parentTopicIds = parentTopicIds;
    }

    @JsonIncludeProperties({"tags", "pageComments", "parentTopicIds", "childrenTopicIds"})
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "page_id", nullable = false)
    private PageEntity pageEntity;

    @OneToMany(mappedBy = "topicPage", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<TopicExternalResource> topicExternalResources = new HashSet<>();

    @OneToMany(mappedBy = "topicPage", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private Set<CodeSnippet> codeSnippets =  new HashSet<>();


    @JsonIncludeProperties({"wikiCategory"})
    @OneToMany(mappedBy = "topicPage", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<WikiTopicPage> parentTopicIds = new ArrayList<>();


    public void addWikiToTopicPage(WikiTopicPage wikiTopicPage) {
        parentTopicIds.add(wikiTopicPage);
        wikiTopicPage.setTopicPage(this);
    }

    public void addCodeSnippet(CodeSnippet codeSnippet) {
        codeSnippets.add(codeSnippet);
        codeSnippet.setTopicPage(this);
    }

    public void addTopicExternalResource(TopicExternalResource topicExternalResource) {
        topicExternalResources.add(topicExternalResource);
        topicExternalResource.setTopicPage(this);
    }

}
