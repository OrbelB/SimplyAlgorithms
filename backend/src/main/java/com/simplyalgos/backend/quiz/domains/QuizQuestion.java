package com.simplyalgos.backend.quiz.domains;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;


import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@Entity(name = "quiz_question")
public class QuizQuestion {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "question_id", columnDefinition = "varchar")
    private UUID questionId;

    @Column(name = "question")
    private String question;

    @Column(name = "picture")
    private String picture;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "quiz_id", referencedColumnName = "quiz_id")
    private Quiz belongsToThisQuiz;


    @OneToMany(mappedBy = "answerBelongsToQuestion", cascade = CascadeType.ALL)
    private Set<QuestionAnswer> answerChoices = new HashSet<>();

//    public void setAnswerChoices(Set<QuestionAnswer> questionAnswerSet) {
//        for (QuestionAnswer questionAnswerSetIterableTemp : questionAnswerSet) {
//            this.answerChoices.add(
//                    QuestionAnswer.builder()
//                            .answer(questionAnswerSetIterableTemp.getAnswer())
//                            .isCorrect(questionAnswerSetIterableTemp.getIsCorrect())
//                            .answerBelongsToQuestion(this)
//                            .build());
//        }
//    }


}
