package com.simplyalgos.backend.quiz.domains;

import com.simplyalgos.backend.quiz.domains.quizId.TakeQuizId;
import com.simplyalgos.backend.user.domains.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.sql.Timestamp;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "take_quiz")
public class TakeQuiz {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "take_quiz_id")
    UUID takeQuizId;

    private int score;

    //hard to use can change to dates
    @CreationTimestamp @Column(name = "started_at")
    private Timestamp startedAt;

    @UpdateTimestamp @Column(name = "finished_at")
    private Timestamp finishedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @MapsId("userId")
    private User takenBy;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id", referencedColumnName = "quiz_id")
    @MapsId("quizId")
    private Quiz quizReference;
}
