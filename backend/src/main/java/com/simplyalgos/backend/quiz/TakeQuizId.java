package com.simplyalgos.backend.quiz;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;


@NoArgsConstructor
@Setter
@Getter
@EqualsAndHashCode

@Embeddable
public class TakeQuizId implements Serializable {

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "quiz_id")
    private UUID quizId;

    @Builder
    public TakeQuizId(UUID userId, UUID quizId) {
        this.userId = userId;
        this.quizId = quizId;
    }
}
