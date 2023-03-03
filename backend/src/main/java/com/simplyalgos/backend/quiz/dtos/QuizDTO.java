package com.simplyalgos.backend.quiz.dtos;

import com.simplyalgos.backend.tag.domains.Tag;
import com.simplyalgos.backend.tag.dto.TagDTO;
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
public class QuizDTO {
    UUID quizId;
    Timestamp createdDate;
    String title;
    int score;
    TagDTO tag;
}
