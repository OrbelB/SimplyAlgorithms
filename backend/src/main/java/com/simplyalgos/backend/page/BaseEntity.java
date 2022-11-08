package com.simplyalgos.backend.page;


import lombok.*;
import lombok.experimental.SuperBuilder;
import net.bytebuddy.implementation.bind.annotation.Super;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;


@Setter
@Getter
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false , name = "page_id")
    private UUID pageId;

    @CreationTimestamp
    @Column(name = "created_date")
    private Timestamp createdDate;

    private String title;

    public BaseEntity(UUID pageId, Timestamp createdDate, String title) {
        this.pageId = pageId;
        this.createdDate = createdDate;
        this.title = title;
    }
}
