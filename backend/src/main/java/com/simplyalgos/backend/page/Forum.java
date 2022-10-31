package com.simplyalgos.backend.page;


import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
@AllArgsConstructor
@Entity(name = "forum_page")
public class Forum extends BaseEntity {


    public Forum(UUID pageID, Timestamp createdDate, String title, String descriptionText, String photo, String video) {
        super(pageID, createdDate, title);
        this.descriptionText = descriptionText;
        this.photo = photo;
        this.video = video;
    }

    @Column(name = "description_text")
    private String descriptionText;

    private String photo;

    private String video;


    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "page_id", nullable = false)
    @MapsId("pageID")
    private PageEntity pageEntityId;

}
