package com.simplyalgos.backend.page.domains;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.domains.ids.WikiTopicPageId;
import jakarta.persistence.*;
import lombok.*;


@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "wikiTopicPageId")
@Entity(name = "wiki_topic_page")
public class WikiTopicPage {

    @EmbeddedId
    private WikiTopicPageId wikiTopicPageId;

    @ManyToOne
    @JoinColumn(name = "wiki_id", referencedColumnName = "wiki_id")
    @MapsId("wikiId")
    private Wiki wikiCategory;


    @ManyToOne
    @JoinColumn(name = "page_id", referencedColumnName = "page_id")
    @MapsId("pageId")
    private Topic topicPage;


}
