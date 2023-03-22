package com.simplyalgos.backend.quiz.dtos;

import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import com.simplyalgos.backend.user.dtos.UserDataDTO;
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
    UUID avgTakeQuizId;
    double averageScore;
    double lowestSore;
    double highestScore;
    double bestTime;
    double worstTime;
    double averageTime;
    int attempts;
    QuizDTO quizDTO;
    UserDataDTO createdBy;
}
