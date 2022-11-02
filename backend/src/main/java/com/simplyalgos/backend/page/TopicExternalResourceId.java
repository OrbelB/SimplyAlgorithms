package com.simplyalgos.backend.page;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class TopicExternalResourceId implements Serializable {

    @Column(name = "external_resource_link")
    private String externalResourceLink;

    @Column(name = "page_id")
    private UUID pageId;

    public TopicExternalResourceId(String externalResourceLink, UUID pageId) {
        this.externalResourceLink = externalResourceLink;
        this.pageId = pageId;
    }
}
