package com.simplyalgos.backend.page.domains;

import com.simplyalgos.backend.page.domains.ids.ViewsId;
import com.simplyalgos.backend.user.domains.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;

import java.sql.Timestamp;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@NoArgsConstructor
@Setter
@Getter
@Entity(name = "views")
public class Views {

    @EmbeddedId
    private ViewsId viewsId;
    @CreationTimestamp
    @Column(name = "visited_date")
    private Timestamp visitedDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "page_id", referencedColumnName = "page_id")
    @OnDelete(action = CASCADE)
    @MapsId("pageId")
    private PageEntity pageViewed;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id",referencedColumnName = "user_id")
    @OnDelete(action = CASCADE)
    @MapsId("userId")
    private User userReferenceView;

    @Builder
    public Views(ViewsId viewsId, Timestamp visitedDate, PageEntity pageViewed, User userReferenceView) {
        this.viewsId = viewsId;
        this.visitedDate = visitedDate;
        this.pageViewed = pageViewed;
        this.userReferenceView = userReferenceView;
    }
}
