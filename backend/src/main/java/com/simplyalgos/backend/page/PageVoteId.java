package com.simplyalgos.backend.page;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.Type;
import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@SuperBuilder
@Embeddable
public class PageVoteId implements Serializable {
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 36, columnDefinition = "varchar", nullable = false, name = "page_id")
    private UUID pageId;

    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 36, columnDefinition = "varchar", nullable = false,name = "user_id")
    private UUID userId;

    public PageVoteId(UUID pageId, UUID userId) {
        this.pageId = pageId;
        this.userId = userId;
    }
}
