package com.simplyalgos.backend.tag;

import com.simplyalgos.backend.page.PageEntity;
import com.simplyalgos.backend.tag.dto.TagDTO;


import java.util.Set;


public interface TagService {
    void mapTagToPageId(PageEntity page, Set<TagDTO> tags);
}