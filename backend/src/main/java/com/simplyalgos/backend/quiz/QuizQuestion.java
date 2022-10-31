package com.simplyalgos.backend.quiz;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;


import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Entity(name = "quiz_question")
public class QuizQuestion {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 16, name = "question_id")
    private UUID questionId;

    @Column(name = "question")
    private String question;

    @Column(name = "picture")
    private String picture;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id", referencedColumnName = "quiz_id")
    private Quiz belongsToThisQuiz;

    @OneToMany(mappedBy = "answerBelongsToQuestion")
    private Set<QuestionAnswer> answerChoices =  new HashSet<>();

}
