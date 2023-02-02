package com.simplyalgos.backend.user.domains;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.util.UUID;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "user_preferences")
public class UserPreferences {
    @Id
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false, name = "user_id")
    private UUID userId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    @MapsId("userId")
    private User user;
    @Column(name = "account_changes")
    private boolean accountChanges;

    @Column(name = "replies_notification")
    private boolean repliesNotification;


    @Column(name = "post_likes")
    private boolean postLikes;

    @Column(name = "post_replies")
    private boolean postReplies;

    @Column(name = "special_updates")
    private boolean specialUpdates;
}
