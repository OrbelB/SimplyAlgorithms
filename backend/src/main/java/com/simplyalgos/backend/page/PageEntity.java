package com.simplyalgos.backend.page;


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
@Entity(name = "page_entity")
public class PageEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 16, name = "page_id")
    private UUID pageID;

    @Column(name = "is_forum_topic_page")
    private String isForumTopicPage;

    @ManyToMany(mappedBy = "pageEntities")
    private Set<Tag> tags = new HashSet<>();

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

}
