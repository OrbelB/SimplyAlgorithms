package com.simplyalgos.backend.quiz.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FullQuizDTO {
    QuizDTO quizDTO;
    List<QuizQuestionDTO> quizQuestionDTO;
}
