package com.simplyalgos.backend.comment;

import lombok.*;
import org.hibernate.annotations.Comment;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@Embeddable
public class ParentChildCommentId implements Serializable {

    @Column(name =  "parent_comment_id")
    private UUID parentCommentId;

    @Column(name = "child_comment_id")
    private UUID childCommentId;

    @Builder
    public ParentChildCommentId(UUID parentCommentId, UUID childCommentId) {
        this.parentCommentId = parentCommentId;
        this.childCommentId = childCommentId;
    }
}
