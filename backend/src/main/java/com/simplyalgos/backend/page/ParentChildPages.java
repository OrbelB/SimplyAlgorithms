package com.simplyalgos.backend.page;


import lombok.*;

import javax.persistence.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
