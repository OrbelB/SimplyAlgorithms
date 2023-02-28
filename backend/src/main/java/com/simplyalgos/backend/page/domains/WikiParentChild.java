package com.simplyalgos.backend.page.domains;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.domains.ids.WikiParentChildId;
import jakarta.persistence.*;
import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "wikiParentChildId")
@Entity(name = "wiki_parent_child")
public class WikiParentChild {

    @EmbeddedId
    private WikiParentChildId  wikiParentChildId;


    @ManyToOne
    @JoinColumn(name = "wiki_parent_id", referencedColumnName = "wiki_id")
    @MapsId("wikiParentId")
    @JsonIgnore
    private Wiki wikiParent;

    @ManyToOne
    @JoinColumn(name = "wiki_child_id", referencedColumnName = "wiki_id")
    @MapsId("wikiChildId")
    @JsonIgnore
    private Wiki wikiChild;


}
