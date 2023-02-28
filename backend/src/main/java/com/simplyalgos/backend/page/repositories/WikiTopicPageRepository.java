package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.WikiTopicPage;
import com.simplyalgos.backend.page.domains.ids.WikiTopicPageId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;
import java.util.UUID;


public interface WikiTopicPageRepository extends JpaRepository<WikiTopicPage, WikiTopicPageId> {

    Set<WikiTopicPage> getWikiTopicPageByWikiTopicPageId_WikiId(UUID wikiId);
}
