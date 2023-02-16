package com.simplyalgos.backend.quiz.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class QuizQuestionDTO {
    UUID questionId;
    UUID quizId;
    String question;
    String picture;
    Set<QuizQuestionAnswerDTO> answers;
}
