package com.simplyalgos.backend.notes.domains;


import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.sql.Timestamp;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "public_notes")
public class PublicNotes {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "public_share_id")
    private UUID publicShareId;

    @Column(name = "share_description")
    private String description;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "shared_date")
    private Timestamp shareDate;

    @OneToOne(fetch = FetchType.LAZY)
    @JsonIncludeProperties({"noteId"})
    @JoinColumn(name = "note_id", referencedColumnName = "note_id")
    private UserNotes publicNote;

}
