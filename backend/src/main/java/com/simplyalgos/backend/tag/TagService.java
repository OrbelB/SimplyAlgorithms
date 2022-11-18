package com.simplyalgos.backend.tag;

import com.simplyalgos.backend.page.PageEntity;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;


import java.util.List;
import java.util.Set;


public interface TagService {
    List<Tag> mapTagToPageId(PageEntity page, Set<TagDTO> tags);

    ObjectPagedList<?> listTags(Pageable pageable);
}