package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.Wiki;
import com.simplyalgos.backend.page.domains.WikiParentChild;
import com.simplyalgos.backend.page.domains.ids.WikiParentChildId;
import com.simplyalgos.backend.page.repositories.projection.WikiTopicPageWikiOnly;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface WikiParentChildRepository extends JpaRepository<WikiParentChild, WikiParentChildId> {

    Set<WikiTopicPageWikiOnly> findAllWikiTopicPageWikiOnlyProjectedBy();

    Set<WikiParentChild> getWikiParentChildByWikiParentChildIdNotInAndWikiParent(Set<WikiParentChildId> parentId, Wiki wikiParent);

    void deleteByWikiParentChildIdNotInAndWikiParent(Set<WikiParentChildId> parentId, Wiki wikiParent);

}
