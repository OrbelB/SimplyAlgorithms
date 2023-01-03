package com.simplyalgos.backend.comment.domains;



import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


import jakarta.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@Entity(name = "parent_child_comment")
public class ParentChildComment {
    @EmbeddedId
    private ParentChildCommentId parentChildCommentId;


    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "parent_comment_id", referencedColumnName = "comment_id")
    @MapsId("parentComment")
    private Comment parentComment;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "child_comment_id", referencedColumnName = "comment_id")
    @MapsId("childComment")
    private Comment childComment;

    @Builder
    public ParentChildComment(ParentChildCommentId parentChildCommentId) {
        this.parentChildCommentId = parentChildCommentId;
    }


}
