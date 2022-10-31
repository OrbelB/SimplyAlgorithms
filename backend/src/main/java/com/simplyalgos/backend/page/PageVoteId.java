package com.simplyalgos.backend.page;

import com.simplyalgos.backend.user.User;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.ManyToOne;
import javax.persistence.NamedEntityGraph;
import java.io.Serializable;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class PageVoteId implements Serializable {


    @Column(name = "page_id")
    private UUID pageId;

    @Column(name = "user_id")
    private UUID userId;

    @Builder
    public PageVoteId(UUID pageId, UUID userId) {
        this.pageId = pageId;
        this.userId = userId;
    }
}
