package com.simplyalgos.backend.quiz;


import com.simplyalgos.backend.tag.Tag;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "quiz")
public class Quiz {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 16, name = "quiz_id")
    private UUID quizId;

    @Column(name = "created_date")
    private Timestamp createdDate;

    private String title;

    private int score;

    @OneToOne
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tagId;

    //mapping question to quiz
    @OneToMany(mappedBy = "belongsToThisQuiz")
    private List<QuizQuestion> questions = new ArrayList<>();


    @OneToMany(mappedBy = "quizReference")
    private Set<TakeQuiz> quizzesTaken = new HashSet<>();
}
