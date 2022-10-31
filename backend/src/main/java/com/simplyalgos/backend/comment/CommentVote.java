package com.simplyalgos.backend.comment;


import com.simplyalgos.backend.user.User;
import lombok.*;

import javax.persistence.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "comment_vote")
@Builder
public class CommentVote {

    @EmbeddedId
    private CommentVoteId commentVoteId;


    private boolean like_dislike;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "comment_id")
    @MapsId("commentId")
    private Comment commentVoteReference;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @MapsId("userId")
    private User userVoteReference;








}
