package com.simplyalgos.backend.user.domains;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


import java.io.Serializable;
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
