package com.simplyalgos.backend.comment.domains;



import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;


import jakarta.persistence.*;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import org.hibernate.annotations.OnDelete;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Setter
@Getter
@NoArgsConstructor
@Entity(name = "parent_child_comment")
public class ParentChildComment {
    @EmbeddedId
    private ParentChildCommentId parentChildCommentId;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "parent_comment_id", referencedColumnName = "comment_id")
    @MapsId("parentCommentId")
    @OnDelete(action = CASCADE)
    private Comment parentComment;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "child_comment_id", referencedColumnName = "comment_id")
    @MapsId("childCommentId")
    @OnDelete(action = CASCADE)
    private Comment childComment;

    @Builder
    public ParentChildComment(ParentChildCommentId parentChildCommentId) {
        this.parentChildCommentId = parentChildCommentId;
    }


}
