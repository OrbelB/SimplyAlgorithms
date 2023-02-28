package com.simplyalgos.backend.page.domains;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.domains.ids.PageVoteId;
import com.simplyalgos.backend.user.domains.User;
import lombok.*;
import lombok.experimental.SuperBuilder;

import jakarta.persistence.*;



@NoArgsConstructor
@Getter
@Setter
@SuperBuilder
@Entity(name = "page_vote")
@Table(
        uniqueConstraints=
        @UniqueConstraint(columnNames = {"user_id", "page_id"})
)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "pageVoteId")
public class PageVote {

    @EmbeddedId
    private PageVoteId pageVoteId;

    private boolean like_dislike;

    public PageVote(PageVoteId pageVoteId, boolean like_dislike, User user, PageEntity pageEntity) {
        this.pageVoteId = PageVoteId.builder().pageId(pageEntity.getPageId()).userId(user.getUserId()).build();
        this.like_dislike = like_dislike;
        this.user = user;
        this.pageEntity = pageEntity;
    }

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false, insertable = false, updatable = false,
            referencedColumnName = "user_id", foreignKey = @ForeignKey(name = "user_id"))
    private User user;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id", nullable = false,insertable = false, updatable = false,
            referencedColumnName = "page_id", foreignKey = @ForeignKey(name = "page_id"))
    private PageEntity pageEntity;
}
