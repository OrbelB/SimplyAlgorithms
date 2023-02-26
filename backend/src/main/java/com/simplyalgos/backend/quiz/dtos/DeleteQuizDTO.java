package com.simplyalgos.backend.quiz.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class DeleteQuizDTO {
    @NotNull
    UUID quizId;

    @NotNull
    UUID userId;
}
