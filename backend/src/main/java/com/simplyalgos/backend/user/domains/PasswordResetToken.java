package com.simplyalgos.backend.user.domains;


import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;


import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "password_reset_token")
public class PasswordResetToken {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, updatable = false, nullable = false , name = "password_reset_token_id", columnDefinition = "varchar" )
    private UUID passwordResetTokenID;

    @Column(name = "expire_date")
    private Date expireDate;

    @JsonIncludeProperties({"userId", "username", "email"})
    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", nullable = false)
    private User userId;


    private Date calculateExpiryDate(final int expiryTimeInMinutes) {
        final Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Date().getTime());
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        return new Date(cal.getTime().getTime());
    }




}
