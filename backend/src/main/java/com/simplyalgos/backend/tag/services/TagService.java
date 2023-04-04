package com.simplyalgos.backend.tag.services;

import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.tag.domains.Tag;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.Set;


public interface TagService {
    List<Tag> mapTagToPageId(PageEntity page, Set<TagDTO> tags);

    ObjectPagedList<?> listTags(Pageable pageable);

    ObjectPagedList<Tag> filterByName(String filterBy, Pageable pageable);
}