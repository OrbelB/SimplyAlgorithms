package com.simplyalgos.backend.comment;

import lombok.*;
import org.hibernate.annotations.Type;


import javax.persistence.*;
import java.io.Serializable;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@Embeddable
public class ParentChildCommentId implements Serializable {

    @Type(type = "org.hibernate.type.UUIDCharType")
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "parent_comment_id", referencedColumnName = "comment_id")
    private Comment parentComment;

    @Type(type = "org.hibernate.type.UUIDCharType")
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "child_comment_id", referencedColumnName = "comment_id")
    private Comment childComment;

    @Builder
    public ParentChildCommentId(Comment parentComment, Comment childComment) {
        this.parentComment = parentComment;
        this.childComment = childComment;
    }
}
