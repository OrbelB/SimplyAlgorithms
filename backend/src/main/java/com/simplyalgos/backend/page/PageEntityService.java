package com.simplyalgos.backend.page;

import com.simplyalgos.backend.tag.dto.TagDTO;

import java.util.Set;
import java.util.UUID;

public interface PageEntityService {

    PageEntity getPageEntity(UUID pageId);

    PageEntity savePageEntity(PageEntity pageEntity);
}
