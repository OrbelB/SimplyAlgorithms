package com.simplyalgos.backend.quiz.domains.quizId;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
@Builder
@Embeddable
public class QuestionAnswerId implements Serializable {

    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "answer_id", columnDefinition = "varchar")
    private UUID answerID;

    @Column(name = "question_id")
    private UUID questionId;

    @Builder
    public QuestionAnswerId(UUID answerID, UUID questionId){
        this.answerID = answerID;
        this.questionId = questionId;
    }

}
