package com.simplyalgos.backend.user.dtos;

import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class TakenQuizzesDashboardDTO {

    UUID userId;
    double averageScore;
    double lowestSore;
    double highestScore;
    int bestTime;
    int worstTime;
    double averageTime;
    int attempts;
    QuizDTO quizDTO;
    UserDataDTO createdBy;
}
