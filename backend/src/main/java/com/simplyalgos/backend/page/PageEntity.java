package com.simplyalgos.backend.page;


import com.fasterxml.jackson.annotation.*;
import com.simplyalgos.backend.comment.Comment;
import com.simplyalgos.backend.report.PageReport;
import com.simplyalgos.backend.tag.Tag;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.*;



@Setter
@Getter
@AllArgsConstructor
@Builder
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "pageId")
@Entity(name = "page_entity")
public class PageEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false , name = "page_id" )
    private UUID pageId;

    @Column(name = "is_forum_topic_page")
    private String isForumTopicPage;

    //only adding the tag and tag_id
    @JsonIgnoreProperties("pageEntities")
    @ManyToMany(mappedBy = "pageEntities", cascade = CascadeType.ALL)
    private Set<Tag> tags;


    @PreRemove
    public void removeTagFromPage(){
        for(Tag t : tags){
            t.getPageEntities().remove(this);
        }
    }


    @OneToMany(mappedBy = "pageEntity")
    private Set<PageVote> pageVotes = new HashSet<>();


    @OneToMany(mappedBy = "parentPageId")
    private Set<ParentChildPages> parentTopicIds = new HashSet<>();


    @OneToMany(mappedBy = "childPageId")
    private Set<ParentChildPages> childrenTopicIds = new HashSet<>();


    @OneToMany(mappedBy = "pageViewed")
    private Set<Views> views = new HashSet<>();


    @OneToMany(mappedBy = "reportedPage")
    private List<PageReport> pageReports = new ArrayList<>();


    @OneToMany(mappedBy = "pageComment")
    private Set<Comment> pageComments = new HashSet<>();

}
