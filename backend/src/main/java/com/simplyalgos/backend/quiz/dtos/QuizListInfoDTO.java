package com.simplyalgos.backend.quiz.dtos;

import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.user.dtos.UserDataDTO;
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
public class QuizListInfoDTO {
    UUID quizId;
    Timestamp createdDate;
    String title;
    String description;
    String picture;
    int score;
    TagDTO tag;
    UserDataDTO createdBy;
}
