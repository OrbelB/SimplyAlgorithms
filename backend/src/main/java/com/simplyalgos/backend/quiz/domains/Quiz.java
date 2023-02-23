package com.simplyalgos.backend.quiz.domains;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import com.simplyalgos.backend.tag.domains.Tag;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.utils.StringUtils;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import jakarta.persistence.*;
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
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "quiz_id")
    private UUID quizId;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "created_date")
    private Timestamp createdDate;

    private String title;

    private int score;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tagId;

    //mapping question to quiz
    @OneToMany(mappedBy = "belongsToThisQuiz", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<QuizQuestion> questions = new ArrayList<>();


    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "quizReference", fetch = FetchType.LAZY)
    private Set<TakeQuiz> quizzesTaken = new HashSet<>();

    @JsonIncludeProperties({"userId", "username", "profilePicture"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User createdBy;


    public void setTag(Tag tag){
        if(StringUtils.isNotNullAndEmptyOrBlank(tag)){
            this.tagId = tag;
        }

    }

//    void setQuestions(List<QuizQuestion> quizQuestionList){
//        for (QuizQuestion quizQuestion : quizQuestionList) {
//            this.questions.add(
//                    QuizQuestion.builder()
//                            .belongsToThisQuiz(this)
//                            .question(quizQuestion.getQuestion())
//                            .answerChoices(quizQuestion.getAnswerChoices())
//                            .picture(quizQuestion.getPicture())
//                            .build()
//            );
//        }
//    }
//    public Quiz(UUID quizId, Timestamp createdDate, String title, int score, Tag tagId, List<QuizQuestion> questions, Set<TakeQuiz> quizzesTaken, User createdBy) {
//        this.quizId = quizId;
//        this.createdDate = createdDate;
//        this.title = title;
//        this.score = score;
//        this.tagId = tagId;
//        this.setQuestions(questions);
//        this.quizzesTaken = quizzesTaken;
//        this.createdBy = createdBy;
//
//    }
}
