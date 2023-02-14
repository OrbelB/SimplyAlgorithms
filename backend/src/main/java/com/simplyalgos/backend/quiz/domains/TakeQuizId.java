package com.simplyalgos.backend.quiz.domains;

import lombok.*;

import jakarta.persistence.*;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.io.Serializable;
import java.util.UUID;


@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode
@Embeddable
public class TakeQuizId implements Serializable {


    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false , name = "user_id" )
    private UUID userId;

    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false , name = "quiz_id" )
    private UUID quizId;

    @Builder
    public TakeQuizId(UUID userId, UUID quizId) {
        this.userId = userId;
        this.quizId = quizId;
    }
}
