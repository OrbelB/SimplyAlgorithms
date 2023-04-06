package com.simplyalgos.backend.user.domains;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.util.UUID;


@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "user_notification")
public class UserNotification {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false, name = "notification_id")
    private UUID notificationId;

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", nullable = false, name = "reference_id", unique = false)
    private UUID referenceId;
    private String title;
    private String message;
    @Column(name = "notification_quantity")
    private short notificationQuantity;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User userNotification;

}
