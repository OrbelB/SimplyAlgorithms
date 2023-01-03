package com.simplyalgos.backend.quiz.domains;

import lombok.*;

import jakarta.persistence.*;
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
