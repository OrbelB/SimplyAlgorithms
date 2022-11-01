package com.simplyalgos.backend.user;

import com.simplyalgos.backend.comment.Comment;
import com.simplyalgos.backend.comment.CommentVote;
import com.simplyalgos.backend.page.PageVote;
import com.simplyalgos.backend.page.Views;
import com.simplyalgos.backend.quiz.TakeQuiz;
import com.simplyalgos.backend.report.CommentReport;
import com.simplyalgos.backend.report.PageReport;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "users")
public class User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(length = 16, name = "user_id")
    private UUID userID;

    private String username;
    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;
    private String email;
    private Date dob;

    @Column(name = "profile_picture")
    private String profilePicture;

    //set default values using builder pattern

    @Column(name = "account_non_expired")
    @Builder.Default
    private Boolean accountNonExpired = true;

    @Column(name = "account_non_locked")
    @Builder.Default
    private Boolean accountNonLocked = true;

    @Column(name = "credentials_non_expired")
    @Builder.Default
    private Boolean credentialsNonExpired = true;

    @Builder.Default
    private Boolean enabled = true;

    @Column(name = "created_date")
    @CreationTimestamp
    private Timestamp createdDate;

    @Column(name = "last_modified_date")
    @UpdateTimestamp
    private Timestamp lastModifiedDate;


    @Column(name = "days_logged_in")
    private int daysLoggedIn;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    //maps user page votes
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<PageVote> pageVotes = new ArrayList<>();

    @OneToMany(mappedBy = "userReferenceView")
    private Set<Views> views = new HashSet<>();

    @OneToMany(mappedBy = "userVoteReference")
    private Set<CommentVote> commentVotes = new HashSet<>();

    @OneToMany(mappedBy = "userQuizReference")
    private Set<TakeQuiz> quizzes = new HashSet<>();

    @OneToMany(mappedBy = "commentReportedBy")
    private List<CommentReport> commentReports = new ArrayList<>();

    @OneToMany(mappedBy = "pageReportedBy")
    private List<PageReport> pageReports = new ArrayList<>();


    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "user_id")
    private Set<UserHistory> userHistories = new LinkedHashSet<>();

}
