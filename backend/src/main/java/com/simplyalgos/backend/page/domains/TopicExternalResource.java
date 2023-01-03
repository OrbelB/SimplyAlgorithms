package com.simplyalgos.backend.page.domains;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;


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

    @CreationTimestamp
    private Timestamp createdDate;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id", referencedColumnName = "page_id", updatable = false, insertable = false)
    private Topic externalTopicPage;
    @Builder
    public TopicExternalResource(TopicExternalResourceId topicExternalResourceId, Timestamp createdDate,
                                 Topic externalTopicPage, UUID pageId, String externalLinkResource) {
        this.topicExternalResourceId = topicExternalResourceId;
        this.createdDate = createdDate;
        this.externalTopicPage = externalTopicPage;
    }
}
