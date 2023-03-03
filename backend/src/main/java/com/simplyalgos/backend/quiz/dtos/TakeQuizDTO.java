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
    UUID takeQuizId;
    UUID userId;
    UUID quizId;
    double score;
    int maxScore;
    Timestamp startedAt;
    Timestamp finishedAt;
    int correct; //the number of questions answered correctly
}
