package com.simplyalgos.backend.notes.domains;


import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.simplyalgos.backend.user.domains.User;
import jakarta.persistence.*;
import jakarta.persistence.CascadeType;
import lombok.*;
import org.hibernate.annotations.*;
import org.hibernate.annotations.Parameter;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "user_notes")
public class UserNotes {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "note_id")
    private UUID noteId;

    @Column(length = 48, name = "note_title")
    private String title;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "created_date")
    private Timestamp createdDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "last_updated")
    private Timestamp lastUpdated;

    @Column(name = "is_public")
    private short isPublic;

    @Column(columnDefinition = "json", name = "note_body")
    private String noteBody;

    @JsonIncludeProperties({"userId", "username", "profilePicture"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @OnDelete(action = CASCADE)
    private User createdBy;

    @OneToMany(mappedBy = "note", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<NoteShare> sharedTo;

    @OneToOne(mappedBy = "publicNote" ,cascade = CascadeType.ALL, orphanRemoval = true)
    private PublicNotes publicNote;

}
