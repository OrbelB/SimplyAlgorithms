package com.simplyalgos.backend.comment;


import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints=
        @UniqueConstraint(columnNames = {"parent_comment_id", "child_comment_id"})
)
@Entity(name = "parent_child_comment")
public class ParentChildComment  {

    @EmbeddedId
    private ParentChildCommentId parentChildCommentId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_comment_id", insertable = false, updatable = false)
    private Comment parentComment;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "child_comment_id", insertable = false,updatable = false)
    private Comment childComment;

}
