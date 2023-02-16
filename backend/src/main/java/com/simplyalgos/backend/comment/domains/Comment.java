package com.simplyalgos.backend.comment.domains;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.report.domains.CommentReport;
import com.simplyalgos.backend.user.domains.User;
import lombok.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;


import jakarta.persistence.*;

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
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(name = "comment_id", length = 36, updatable = false, nullable = false, columnDefinition = "varchar")
    private UUID commentId;

    @JsonIncludeProperties({"userId", "username", "profilePicture","firstName", "lastName"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private User createdBy;

    @Column(name = "comment_text")
    private String commentText;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_date")
    private java.util.Date createdDate;

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
    @JsonIncludeProperties({"pageId"})
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "page_id", referencedColumnName = "page_id")
    private PageEntity pageComment;


    public void setPageComment(PageEntity pageComment) {
        this.pageComment = pageComment;
        pageComment.getPageComments().add(this);
    }
}
