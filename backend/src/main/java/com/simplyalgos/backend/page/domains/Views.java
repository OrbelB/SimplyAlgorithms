package com.simplyalgos.backend.page.domains;

import com.simplyalgos.backend.page.domains.ids.ViewsId;
import com.simplyalgos.backend.user.domains.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.*;
import java.sql.Timestamp;

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
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "page_id", referencedColumnName = "page_id")
    @MapsId("pageId")
    private PageEntity pageViewed;

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
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
