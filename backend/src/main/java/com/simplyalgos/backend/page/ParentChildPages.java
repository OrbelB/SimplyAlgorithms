package com.simplyalgos.backend.page;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import javax.persistence.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(
        uniqueConstraints=
        @UniqueConstraint(columnNames = {"parent_page_id", "child_page_id"})
)
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "parentChildTopicPagesId")
@Entity(name = "parent_child_pages")
public class ParentChildPages {

    @EmbeddedId
    private ParentChildPagesId parentChildTopicPagesId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_page_id")
    @MapsId("parentPageId")
    private PageEntity parentPageId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "child_page_id")
    @MapsId("childPageId")
    private PageEntity childPageId;

}
