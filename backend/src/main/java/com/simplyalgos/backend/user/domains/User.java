package com.simplyalgos.backend.user.domains;

import com.fasterxml.jackson.annotation.*;
import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.comment.domains.CommentVote;
import com.simplyalgos.backend.page.domains.Forum;
import com.simplyalgos.backend.page.domains.PageVote;
import com.simplyalgos.backend.page.domains.Views;
import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.report.domains.CommentReport;
import com.simplyalgos.backend.report.domains.PageReport;
import com.simplyalgos.backend.user.security.Role;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.usertype.UserTypeLegacyBridge;
import org.springframework.security.core.CredentialsContainer;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.*;
import java.util.stream.Collectors;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "userId")
public class User implements UserDetails, CredentialsContainer {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false, name = "user_id")
    private UUID userId;

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

    private String biography;

    @Column(name = "phone_number")
    private String phoneNumber;


    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

    @Override
    public void eraseCredentials() {
        this.password = null;
    }

    @Singular
    @ManyToMany(cascade = {CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
            joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "user_id", foreignKey = @ForeignKey(name = "user_id"))},
            inverseJoinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "role_id", foreignKey = @ForeignKey(name = "role_id"))})
    private Set<Role> roles;

    //Transient annotation is used to exclude this field from the object
    //property is calculated and not stored in the database or persisted
    @Transient
    public Set<GrantedAuthority> getAuthorities() {
        return this.roles.stream()
                .map(Role::getAuthorities)
                .flatMap(Set::stream)
                .map(authority -> (GrantedAuthority) new SimpleGrantedAuthority(authority.getPermission()))
                .collect(Collectors.toSet());
    }


    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments = new ArrayList<>();
    //maps user page votes
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PageVote> pageVotes = new ArrayList<>();

    @OneToMany(mappedBy = "userReferenceView", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Views> views = new HashSet<>();

    @OneToMany(mappedBy = "userVoteReference", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<CommentVote> commentVotes = new HashSet<>();

    @OneToMany(mappedBy = "userQuizReference",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<TakeQuiz> quizzes = new HashSet<>();

    @OneToMany(mappedBy = "commentReportedBy", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CommentReport> commentReports = new ArrayList<>();

    @OneToMany(mappedBy = "pageReportedBy",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<PageReport> pageReports = new ArrayList<>();

    @OneToMany(mappedBy = "createdBy",cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Forum> forumsCreated = new HashSet<>();

    @OneToMany(mappedBy = "userNotification", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<UserNotification> userNotifications = new HashSet<>();

}
