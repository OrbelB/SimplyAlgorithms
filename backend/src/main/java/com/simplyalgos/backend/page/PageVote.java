package com.simplyalgos.backend.page;

import com.simplyalgos.backend.user.User;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "page_vote")
public class PageVote {

    @EmbeddedId
    private PageVoteId pageVoteId;

    private boolean like_dislike;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @MapsId("userId")
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id")
    @MapsId("pageId")
    private PageEntity pageEntity;

}
