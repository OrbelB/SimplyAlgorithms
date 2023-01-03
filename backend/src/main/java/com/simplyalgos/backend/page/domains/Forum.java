package com.simplyalgos.backend.page.domains;


import com.fasterxml.jackson.annotation.*;
import com.simplyalgos.backend.user.domains.User;
import lombok.*;

import jakarta.persistence.*;
import java.util.Date;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "forum_page")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "pageId")
public class Forum extends BaseEntity {
    @Column(name = "description_text")
    private String descriptionText;

    private String photo;

    private String video;

    @Column(name = "down_votes")
    private int downVotes;

    @Column(name = "up_votes")
    private int upVotes;

    @JsonIncludeProperties({"tags", "pageComments"})
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "page_id", nullable = false)
    private PageEntity pageEntityId;

    @JsonIncludeProperties({"userId", "username", "profilePicture"})
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id", foreignKey = @ForeignKey(name = "user_id"))
    private User createdBy;

    @Builder
    public Forum(UUID pageId, Date createdDate, String title, String descriptionText, String photo, String video, int downVotes, int upVotes, PageEntity pageEntityId, User createdBy) {
        super(pageId, createdDate, title);
        this.descriptionText = descriptionText;
        this.photo = photo;
        this.video = video;
        this.downVotes = downVotes;
        this.upVotes = upVotes;
        this.pageEntityId = pageEntityId;
        this.createdBy = createdBy;
    }
}
