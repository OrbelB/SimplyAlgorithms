package com.simplyalgos.backend.user.domains;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import jakarta.persistence.*;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.sql.Date;
import java.util.UUID;


@Setter
@Getter
@NoArgsConstructor
@Entity(name = "user_history")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class UserHistory {

    @Id
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", nullable = false, name = "user_id")
    private UUID userId;

    @Column(name = "days_streak")
    private short dayStreak;

    @Temporal(TemporalType.DATE)
    @Column(name = "day_logged_in")
    private Date dayLoggedIn;

    @MapsId("userId")
    @JoinColumn(name = "user_id")
    @JsonIncludeProperties({"userId"})
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private User userReference;

    @Builder
    public UserHistory(UUID userId, short dayStreak, Date dayLoggedIn, User userReference) {
        this.userId = userId;
        this.dayStreak = dayStreak;
        this.dayLoggedIn = dayLoggedIn;
        this.userReference = userReference;
    }

}
