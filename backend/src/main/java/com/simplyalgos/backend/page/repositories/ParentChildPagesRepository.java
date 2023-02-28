package com.simplyalgos.backend.page.repositories;


import com.simplyalgos.backend.page.domains.ParentChildPages;
import com.simplyalgos.backend.page.domains.ids.ParentChildPagesId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ParentChildPagesRepository extends JpaRepository<ParentChildPages, ParentChildPagesId> {

    List<ParentChildPages> findAllByParentChildTopicPagesId_ParentPageId(UUID parentChildTopicPagesId_parentPageId);
}
