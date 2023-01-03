package com.simplyalgos.backend.comment.domains;

import com.simplyalgos.backend.comment.domains.Comment;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;


import jakarta.persistence.*;
import java.io.Serializable;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@Embeddable
public class ParentChildCommentId implements Serializable {

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "parent_comment_id", referencedColumnName = "comment_id")
    private Comment parentComment;

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "child_comment_id", referencedColumnName = "comment_id")
    private Comment childComment;

    @Builder
    public ParentChildCommentId(Comment parentComment, Comment childComment) {
        this.parentComment = parentComment;
        this.childComment = childComment;
    }
}
