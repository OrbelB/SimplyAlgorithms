package com.simplyalgos.backend.page.domains.ids;

import lombok.*;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
@Builder
@Embeddable
public class TopicExternalResourceId implements Serializable {

    @Column(name = "external_resource_link")
    private String externalResourceLink;



    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(name = "page_id")
    private UUID pageId;

    public TopicExternalResourceId(String externalResourceLink, UUID pageId) {
        this.externalResourceLink = externalResourceLink;
        this.pageId = pageId;
    }
}
