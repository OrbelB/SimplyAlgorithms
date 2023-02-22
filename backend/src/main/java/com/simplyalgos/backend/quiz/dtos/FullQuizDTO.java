package com.simplyalgos.backend.quiz.dtos;

import com.simplyalgos.backend.user.dtos.UserDataDTO;
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
    UserDataDTO userDto;
    QuizDTO quizDTO;
    List<QuizQuestionDTO> quizQuestionDTO;
}
