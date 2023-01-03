package com.simplyalgos.backend.quiz.domains;

import com.simplyalgos.backend.user.domains.User;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.*;
import java.sql.Timestamp;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "take_quiz")
public class TakeQuiz {

    @EmbeddedId
    private TakeQuizId takeQuizId;

    private int score;

    @CreationTimestamp @Column(name = "started_at")
    private Timestamp startedAt;

    @UpdateTimestamp @Column(name = "finished_at")
    private Timestamp finishedAt;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    @MapsId("userId")
    private User userQuizReference;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id", referencedColumnName = "quiz_id")
    @MapsId("quizId")
    private Quiz quizReference;
}
