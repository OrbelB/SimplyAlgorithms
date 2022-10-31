package com.simplyalgos.backend.page;

import com.simplyalgos.backend.user.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@Entity(name = "views")
public class Views {

    @EmbeddedId
    private ViewsId viewsId;

    @CreationTimestamp
    @Column(name="visited_date")
    private Timestamp visitedDate;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id")
    @MapsId("pageId")
    private PageEntity pageViewed;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @MapsId("userId")
    private User userReferenceView;


}
