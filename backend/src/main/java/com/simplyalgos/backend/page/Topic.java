package com.simplyalgos.backend.page;


import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity(name = "topic_page")
public class Topic extends BaseEntity {
    private String video;

    @Column(name = "running_time")
    private String runningTime;

    @Column(name = "time_complexity")
    private String timeComplexity;

    private String explanation;


    public Topic(UUID pageID, Timestamp createdDate, String title, String video, String runningTime, String timeComplexity, String explanation) {
        super(pageID, createdDate, title);
        this.video = video;
        this.runningTime = runningTime;
        this.timeComplexity = timeComplexity;
        this.explanation = explanation;
    }

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "page_id", nullable = false)
    @MapsId("pageID")
    private PageEntity pageEntityId;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL)
    private List<TopicSteps> topicSteps = new ArrayList<>();


    @OneToMany(mappedBy = "externalTopicPageId", cascade = CascadeType.ALL)
    private List<TopicExternalResources> topicExternalResources = new ArrayList<>();
}
