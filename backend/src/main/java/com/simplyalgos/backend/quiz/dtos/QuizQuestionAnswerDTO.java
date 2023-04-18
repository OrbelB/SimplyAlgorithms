package com.simplyalgos.backend.quiz.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class QuizQuestionAnswerDTO {
    UUID answerId;
    UUID questionId;
    short isCorrect;
    String answer;

    boolean deleteAnswer = false;

}
