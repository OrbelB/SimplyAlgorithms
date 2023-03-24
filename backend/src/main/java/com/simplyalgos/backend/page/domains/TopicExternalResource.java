package com.simplyalgos.backend.page.domains;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.domains.ids.TopicExternalResourceId;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;


@Getter
@Setter
@NoArgsConstructor
@Entity(name = "page_external_resource")
@Table(
        uniqueConstraints =
        @UniqueConstraint(columnNames = {"external_resource_link", "page_id"})
)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "topicExternalResourceId")
public class TopicExternalResource {
    @EmbeddedId
    private TopicExternalResourceId topicExternalResourceId;

    private String title;
    @CreationTimestamp
    private Timestamp createdDate;
    @ManyToOne
    @JoinColumn(name = "page_id", referencedColumnName = "page_id")
    @MapsId("pageId")
    private Topic topicPage;

    @Builder
    public TopicExternalResource(TopicExternalResourceId topicExternalResourceId, String title, Timestamp createdDate, Topic topicPage) {
        this.topicExternalResourceId = topicExternalResourceId;
        this.title = title;
        this.createdDate = createdDate;
        this.topicPage = topicPage;
    }
}
