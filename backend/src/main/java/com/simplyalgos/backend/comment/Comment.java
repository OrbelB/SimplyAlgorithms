package com.simplyalgos.backend.comment;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.PageEntity;
import com.simplyalgos.backend.report.CommentReport;
import com.simplyalgos.backend.user.User;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;


import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "comments")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "commentId")
@Builder
public class Comment {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(name = "comment_id", length = 36, updatable = false, nullable = false, columnDefinition = "varchar")
    private UUID commentId;

    @JsonIncludeProperties({"userId", "username", "profilePicture","firstName", "lastName"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User createdBy;

    @Column(name = "comment_text")
    private String commentText;

    @CreationTimestamp
    @Column(name = "created_date")
    private Timestamp createdDate;

    @Column(name = "is_parent_child")
    private String isParentChild;

    private Integer likes;

    private Integer dislikes;

    @OneToMany(mappedBy = "childComment", orphanRemoval = true)
    private List<ParentChildComment> parentComments;


    @OneToMany(mappedBy = "parentComment", orphanRemoval = true)
    private List<ParentChildComment> childrenComments;


    @OneToMany(mappedBy = "commentVoteReference")
    private Set<CommentVote> commentVotes;


    @OneToMany(mappedBy = "reportedComment")
    private Set<CommentReport> commentReports;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id", referencedColumnName = "page_id", foreignKey = @ForeignKey(name = "page_id"))
    private PageEntity pageComment;

}
