package com.simplyalgos.backend.comment.domains;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.io.Serializable;
import java.util.UUID;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@Embeddable
public class ParentChildCommentId implements Serializable {

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(name = "parent_comment_id", length = 36, columnDefinition = "varchar")
    private UUID parentCommentId;

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(name = "child_comment_id", length = 36, columnDefinition = "varchar")
    private UUID childCommentId;

    @Builder
    public ParentChildCommentId(UUID parentComment, UUID childComment) {
        this.parentCommentId = parentComment;
        this.childCommentId = childComment;
    }
}
