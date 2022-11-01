package com.simplyalgos.backend.user;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.UUID;

@Setter
@Getter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Embeddable
public class UserHistoryId implements Serializable {

    @Column(name = "user_id")
    private UUID userId;

    @CreationTimestamp
    @Column(name = "day_logged_in")
    private Timestamp dayLoggedIn;
}
