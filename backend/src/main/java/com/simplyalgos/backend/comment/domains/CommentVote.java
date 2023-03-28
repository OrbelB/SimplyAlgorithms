package com.simplyalgos.backend.comment.domains;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.user.domains.User;
import lombok.*;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;


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
    @OnDelete(action = CASCADE)
    private Comment commentVoteReference=  new Comment();

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    @OnDelete(action = CASCADE)
    private User userVoteReference = new User();

    @Builder
    public CommentVote(CommentVoteId commentVoteId, boolean like_dislike, Comment commentVoteReference, User userVoteReference) {
        this.vote = like_dislike;
        this.commentVoteReference = commentVoteReference;
        this.userVoteReference = userVoteReference;
        this.commentVoteId = commentVoteId;
    }
}
