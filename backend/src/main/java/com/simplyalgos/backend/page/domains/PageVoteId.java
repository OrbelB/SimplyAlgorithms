package com.simplyalgos.backend.page.domains;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@SuperBuilder
@Embeddable
public class PageVoteId implements Serializable {
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", nullable = false, name = "page_id")
    private UUID pageId;

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", nullable = false,name = "user_id")
    private UUID userId;

    public PageVoteId(UUID pageId, UUID userId) {
        this.pageId = pageId;
        this.userId = userId;
    }
}
