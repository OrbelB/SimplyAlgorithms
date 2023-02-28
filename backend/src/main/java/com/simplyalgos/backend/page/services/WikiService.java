package com.simplyalgos.backend.page.services;


import com.simplyalgos.backend.page.dtos.PageBasicInfo;
import com.simplyalgos.backend.page.dtos.WikiDTO;

import java.util.Set;
import java.util.UUID;

public interface WikiService {

    Set<?>  getWikiMainCategories();

    UUID  saveWikiMainCategory(WikiDTO wiki);

    Set<PageBasicInfo> getWikiTopics(UUID wikiId);
}
