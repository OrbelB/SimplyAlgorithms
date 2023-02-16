package com.simplyalgos.backend.quiz.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TakeQuizDTO {
    UUID userId;
    UUID quizId;
    int score;
    Timestamp startedAt;
    Timestamp finishedAt;



}
