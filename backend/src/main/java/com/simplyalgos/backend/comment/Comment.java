package com.simplyalgos.backend.comment;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.PageEntity;
import com.simplyalgos.backend.report.CommentReport;
import com.simplyalgos.backend.user.User;
import lombok.*;

import org.hibernate.annotations.GenericGenerator;


import javax.persistence.*;
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
    @Column(name = "comment_id", length = 16)
    private UUID commentId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User userId;

    @Column(name = "comment_text")
    private String commentText;

    @Column(name = "created_date")
    private String createdDate;

    @Column(name = "is_parent_child")
    private String isParenChild;

    private Integer likes;

    private Integer dislikes;

    @OneToMany(mappedBy = "commentVoteReference")
    private Set<CommentVote> commentVotes = new HashSet<>();

    @OneToMany(mappedBy = "parentComment")
    private List<ParentChildComment> parentComments = new ArrayList<>();

    @OneToMany(mappedBy = "childComment")
    private List<ParentChildComment> childComments = new ArrayList<>();


    @OneToMany(mappedBy = "reportedComment")
    private Set<CommentReport> commentReports = new HashSet<>();

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id", referencedColumnName = "page_id",foreignKey = @ForeignKey(name = "page_id"))
    private PageEntity pageComment;

}
