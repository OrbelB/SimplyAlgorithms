package com.simplyalgos.backend.page.domains.ids;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.io.Serializable;
import java.util.UUID;

@Data
@Embeddable
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WikiTopicPageId implements Serializable {


    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(name = "page_id", length = 36, columnDefinition = "varchar")
    private UUID pageId;

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(name = "wiki_id", length = 36, columnDefinition = "varchar")
    private UUID wikiId;

}
