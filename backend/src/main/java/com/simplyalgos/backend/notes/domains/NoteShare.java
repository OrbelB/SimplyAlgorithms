package com.simplyalgos.backend.notes.domains;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.simplyalgos.backend.user.domains.User;
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
@Entity(name = "note_share")
public class NoteShare {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "share_id")
    private UUID shareId;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "share_date")
    private Timestamp shareDate;


    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "share_length")
    private Timestamp shareLength;

//    0 cannot edit
//    1 can edit
    @Column(name = "can_edit", columnDefinition = "" +
            "tinyint default 0")
    private short canEdit;

//  person being shared too
    @JsonIncludeProperties({"userId", "username", "profilePicture"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User sharedTo;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "note_id", referencedColumnName = "note_id")
    private UserNotes note;

}
