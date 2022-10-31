package com.simplyalgos.backend.page;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;


@Setter
@Getter
@NoArgsConstructor
@SuperBuilder
@MappedSuperclass
public class BaseEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 16, name = "page_id")
    private UUID pageID;

    @CreationTimestamp
    @Column(name = "created_date")
    private Timestamp createdDate;

    private String title;

    @Builder
    public BaseEntity(UUID pageID, Timestamp createdDate, String title) {
        this.pageID = pageID;
        this.createdDate = createdDate;
        this.title = title;
    }
}
