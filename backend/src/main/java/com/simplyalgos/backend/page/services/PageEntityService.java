package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.page.domains.PageEntity;

import java.util.UUID;

public interface PageEntityService {

    PageEntity getPageEntity(UUID pageId);

    PageEntity savePageEntity(PageEntity pageEntity);
}
