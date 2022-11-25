package com.simplyalgos.backend.page;

import lombok.*;
import org.hibernate.annotations.Type;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
@Embeddable
public class ViewsId implements Serializable {

    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(name = "page_id")
    private UUID pageId;

    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(name = "user_id")
    private UUID userId;

    @Builder
    public ViewsId(UUID pageId, UUID userId) {
        this.pageId = pageId;
        this.userId = userId;
    }
}
