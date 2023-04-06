package com.simplyalgos.backend.universalReport.domain;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.simplyalgos.backend.user.domains.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.*;
import org.hibernate.annotations.Parameter;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.sql.Timestamp;
import java.util.UUID;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "universal_report")
public class UniversalReport {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "report_id")
    private UUID reportId;

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))

    @Column(length = 36, name = "forign_id")
    private UUID foreignId;

    @Column(length = 256, name = "type_of_id")
    private String typeOfForeignId;

    @Column(length = 256, name = "catagory")
    private String catagory;

    @Column(length = 512, name = "report")
    private String report;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "report_date")
    private Timestamp reportDate;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "resolve_date")
    private Timestamp resolveDate;

    @Column(name = "resolved")
    private String isResolved;

    @Column(length = 512, name = "resolved_notes")
    private String resolveNote;

    @JsonIncludeProperties({"userId", "username", "profilePicture"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "resolved_by_userId", referencedColumnName = "user_id")
    @OnDelete(action = CASCADE)
    private User resolvedBy;


    @JsonIncludeProperties({"userId", "username", "profilePicture"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "culprit_user_id", referencedColumnName = "user_id")
    @OnDelete(action = CASCADE)
    private User culpritUser;

    @JsonIncludeProperties({"userId", "username", "profilePicture"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "victim_user_id", referencedColumnName = "user_id")
    @OnDelete(action = CASCADE)
    private User victimUser;


}
