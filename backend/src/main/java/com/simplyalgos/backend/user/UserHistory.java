package com.simplyalgos.backend.user;

import lombok.*;

import javax.persistence.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "user_history")
public class UserHistory {

    @EmbeddedId
    private UserHistoryId userHistoryId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @MapsId("userId")
    private User userReference;
}
