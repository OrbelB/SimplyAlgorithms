package com.simplyalgos.backend.page.domains;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.simplyalgos.backend.page.domains.ids.WikiParentChildId;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "wiki_parent_child")
public class WikiParentChild {

    @EmbeddedId
    private WikiParentChildId  wikiParentChildId;


    @ManyToOne
    @JoinColumn(name = "wiki_parent_id", referencedColumnName = "wiki_id")
    @MapsId("wikiParentId")
    @OnDelete(action = CASCADE)
    @JsonIgnore
    private Wiki wikiParent;

    @ManyToOne
    @JoinColumn(name = "wiki_child_id", referencedColumnName = "wiki_id")
    @MapsId("wikiChildId")
    @JsonIncludeProperties({"wikiId","wikiName"})
    @OnDelete(action = CASCADE)
    private Wiki wikiChild;


}
