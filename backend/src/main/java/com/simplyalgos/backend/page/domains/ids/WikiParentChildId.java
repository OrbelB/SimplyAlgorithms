package com.simplyalgos.backend.page.domains.ids;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.io.Serializable;
import java.util.UUID;

@Data
@NoArgsConstructor
@Embeddable
public class WikiParentChildId implements Serializable {

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(name = "wiki_parent_id", length = 36, columnDefinition = "varchar")
    private UUID wikiParentId;

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(name = "wiki_child_id", length = 36, columnDefinition = "varchar")
    private UUID wikiChildId;

    @Builder
    public WikiParentChildId(UUID wikiParentId, UUID wikiChildId) {
        this.wikiParentId = wikiParentId;
        this.wikiChildId = wikiChildId;
    }

}
