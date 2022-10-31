package com.simplyalgos.backend.comment;


import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "parent_child_comment")
public class ParentChildComment  {

    @EmbeddedId
    private ParentChildCommentId parentChildCommentId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_comment_id")
    @MapsId("parentCommentId")
    private Comment parentComment;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "child_comment_id")
    @MapsId("childCommentId")
    private Comment childComment;

}
