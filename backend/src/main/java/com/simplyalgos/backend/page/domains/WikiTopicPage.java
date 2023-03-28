package com.simplyalgos.backend.page.domains;


import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.simplyalgos.backend.page.domains.ids.WikiTopicPageId;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;


@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
@Builder
@Entity(name = "wiki_topic_page")
public class WikiTopicPage {

    @EmbeddedId
    private WikiTopicPageId wikiTopicPageId;

    @ManyToOne
    @JoinColumn(name = "wiki_id", referencedColumnName = "wiki_id")
    @MapsId("wikiId")
    @OnDelete(action = CASCADE)
    private Wiki wikiCategory;
    @ManyToOne
    @JsonIncludeProperties({"pageId","title", "urlPath"})
    @JoinColumn(name = "page_id", referencedColumnName = "page_id")
    @MapsId("pageId")
    @OnDelete(action = CASCADE)
    private Topic topicPage;
}
