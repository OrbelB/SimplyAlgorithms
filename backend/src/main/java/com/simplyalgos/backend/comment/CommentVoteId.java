package com.simplyalgos.backend.comment;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
@Embeddable
public class CommentVoteId implements Serializable {

    @Column(name = "comment_id")
    private UUID commentId;

    @Column(name = "user_id")
    private UUID userId;

    @Builder
    public CommentVoteId(UUID commentId, UUID userId) {
        this.commentId = commentId;
        this.userId = userId;
    }
}
