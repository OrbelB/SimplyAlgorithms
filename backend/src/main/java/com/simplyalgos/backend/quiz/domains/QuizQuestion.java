package com.simplyalgos.backend.quiz.domains;


import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;


import jakarta.persistence.*;
import java.util.HashSet;
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

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id", referencedColumnName = "quiz_id")
    private Quiz belongsToThisQuiz;

//    possible change this to UUIDs
    @OneToMany(mappedBy = "answerBelongsToQuestion")
    private Set<QuestionAnswer> answerChoices =  new HashSet<>();

}
