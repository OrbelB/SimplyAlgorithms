package com.simplyalgos.backend.page.domains;


import lombok.*;

import org.hibernate.annotations.CreationTimestamp;

import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;


import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@MappedSuperclass
public class BaseEntity {

    @Id
//    @GeneratedValue(generator = "UUID")
//    @GenericGenerator(
//            name = "UUID",
//            strategy = "org.hibernate.id.UUIDGenerator"
//    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false, name = "page_id")
    private UUID pageId;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date")
    private java.util.Date createdDate;

    private String title;

    public BaseEntity(UUID pageId, Date createdDate, String title) {
        this.pageId = pageId;
        this.createdDate = createdDate;
        this.title = title;
    }
}
