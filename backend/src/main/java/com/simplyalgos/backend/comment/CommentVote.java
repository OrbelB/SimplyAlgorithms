package com.simplyalgos.backend.comment;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.user.User;
import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@NoArgsConstructor
@Entity(name = "comment_vote")
@Table(
        uniqueConstraints =
        @UniqueConstraint(columnNames = {"comment_id", "user_id"})
)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "commentVoteId")
public class CommentVote {

    @EmbeddedId
    private CommentVoteId commentVoteId;


    @Column(name = "like_dislike")
    private boolean vote;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id", insertable = false, updatable = false)
    private Comment commentVoteReference=  new Comment();

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User userVoteReference = new User();

    @Builder
    public CommentVote(CommentVoteId commentVoteId, boolean like_dislike, Comment commentVoteReference, User userVoteReference) {
        this.vote = like_dislike;
        this.commentVoteReference = commentVoteReference;
        this.userVoteReference = userVoteReference;
        this.commentVoteId = commentVoteId;
    }
}
