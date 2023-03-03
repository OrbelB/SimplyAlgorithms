package com.simplyalgos.backend.user.dtos;

import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import lombok.*;

import java.lang.reflect.Type;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

// Can pass in anything to graph be it average quiz score of a specific quiz or anything else;
public class QuizScoreGraphDTO {

    int ySize;
    int xSize;
    List<?> yAxis;
    List<?> xAxis;
}
