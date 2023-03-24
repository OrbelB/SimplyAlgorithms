package com.simplyalgos.backend.page.services;


import com.simplyalgos.backend.page.domains.Wiki;
import com.simplyalgos.backend.page.dtos.PageWikiInfo;
import com.simplyalgos.backend.page.dtos.WikiDTO;
import com.simplyalgos.backend.page.dtos.WikiInfo;

import java.util.Set;
import java.util.UUID;

public interface WikiService {

    Set<?> getWikiMainCategories();

    Set<?> getSubCategories();

    String saveWiki(WikiDTO wiki);

    Set<WikiInfo> getAvailableWikis();

    Set<?> getWikiTopics(UUID wikiId);

    Set<PageWikiInfo> getWikiTopicsBasicInfo();

    boolean isWikiNameAvailable(String name);

    UUID deleteWiki(UUID wikiId);

    Wiki getWiki(UUID wikiId);

    String updateWiki(WikiDTO wiki);

    Wiki getWiki(String wikiName);

    Set<WikiInfo> getAllWikiSubCategoriesBasicInfo();
}
