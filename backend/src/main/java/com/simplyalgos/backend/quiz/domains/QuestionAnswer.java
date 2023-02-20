package com.simplyalgos.backend.quiz.domains;

import com.simplyalgos.backend.quiz.domains.quizId.QuestionAnswerId;
import lombok.*;

import jakarta.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "question_answer")
public class QuestionAnswer {

    @EmbeddedId
    private QuestionAnswerId questionAnswerId;

    private String answer;

    @Column(name = "is_correct")
    private boolean isCorrect;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "question_id", referencedColumnName = "question_id")
    @MapsId("questionId")
    private QuizQuestion answerBelongsToQuestion;



}
