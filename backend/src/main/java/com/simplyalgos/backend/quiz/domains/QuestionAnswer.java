package com.simplyalgos.backend.quiz.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import lombok.*;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "question_answer")
public class QuestionAnswer {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    private UUID answerId;

    private String answer;

    @Column(name = "is_correct")
    private short isCorrect;

    @JsonIncludeProperties({"questionId"})
    @ManyToOne
    @JoinColumn(name = "question_id", referencedColumnName = "question_id")
    private QuizQuestion answerBelongsToQuestion;

}
