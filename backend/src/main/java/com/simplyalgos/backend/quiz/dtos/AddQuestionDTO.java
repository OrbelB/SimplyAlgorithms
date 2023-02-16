package com.simplyalgos.backend.quiz.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class AddQuestionDTO {
    String quizId;
    String question;
    String questionPicture;
    Set<QuizQuestionAnswerDTO> answerList;
}
