package com.simplyalgos.backend.page;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


import javax.persistence.*;
import java.sql.Timestamp;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "page_external_resource")
public class TopicExternalResources {

    @EmbeddedId
    private TopicExternalResourceId topicExternalResourceId;

    @CreationTimestamp
    private Timestamp createdDate;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id", referencedColumnName = "page_id")
    @MapsId("pageId")
    private Topic externalTopicPageId;

}
