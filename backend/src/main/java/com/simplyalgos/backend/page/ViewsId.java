package com.simplyalgos.backend.page;

import lombok.*;

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
    @Column(name = "page_id")
    private UUID pageId;

    @Column(name = "user_id")
    private UUID userId;

    @Builder
    public ViewsId(UUID pageId, UUID userId) {
        this.pageId = pageId;
        this.userId = userId;
    }
}
