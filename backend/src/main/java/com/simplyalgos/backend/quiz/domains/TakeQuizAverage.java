package com.simplyalgos.backend.quiz.domains;


import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.simplyalgos.backend.user.domains.User;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "take_quiz_average")
public class TakeQuizAverage {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "avg_take_quiz_id")
    private UUID avgTakeQuizId;

    @Column(name = "average_score")
    private double avgScore;

    @Column(name = "lowest_score")
    private double lowestScore;

    @Column(name = "highest_score")
    private double highestScore;

    @Column(name = "best_time")
    private double bestTime;

    @Column(name = "worst_time")
    private double worstTime;

    @Column(name = "avgrage_time")
    private double avgTime;

    @Column(name = "attempts")
    private int attempts;

    @JsonIncludeProperties({"userId", "username", "profilePicture"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User user;

    @JsonIncludeProperties({"quizId", "score"})
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "quiz_id", referencedColumnName = "quiz_id")
    private Quiz referenceQuizForAvgScore;



}
