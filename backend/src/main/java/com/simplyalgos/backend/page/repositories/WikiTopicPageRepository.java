package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.domains.Wiki;
import com.simplyalgos.backend.page.domains.WikiTopicPage;
import com.simplyalgos.backend.page.domains.ids.WikiTopicPageId;
import com.simplyalgos.backend.page.repositories.projection.WikiTopicPageOnly;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;
import java.util.UUID;


public interface WikiTopicPageRepository extends JpaRepository<WikiTopicPage, WikiTopicPageId> {


    void deleteByWikiTopicPageIdNotInAndWikiCategory(Set<WikiTopicPageId> wikiTopicPageIds, Wiki wikiCategory);

    void deleteByWikiTopicPageIdNotInAndTopicPage(Set<WikiTopicPageId> wikiTopicPageIds, Topic topicPage);
    Set<WikiTopicPage> findAllByWikiTopicPageIdNotInAndWikiCategory(Set<WikiTopicPageId> wikiTopicPageIds, Wiki wikiCategory);

    List<WikiTopicPageOnly> findAllProjectedBy();
    Set<WikiTopicPage> getWikiTopicPageByWikiTopicPageId_WikiId(UUID wikiId);



}
