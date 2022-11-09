package com.simplyalgos.backend.comment;

import lombok.*;
import org.hibernate.annotations.Type;

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


    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(name = "comment_id")
    private UUID commentId;

    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(name = "user_id")
    private UUID userId;

    @Builder
    public CommentVoteId(UUID commentId, UUID userId) {
        this.commentId = commentId;
        this.userId = userId;
    }
}
