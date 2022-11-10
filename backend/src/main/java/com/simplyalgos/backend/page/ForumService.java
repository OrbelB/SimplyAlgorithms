package com.simplyalgos.backend.page;

import com.simplyalgos.backend.page.dto.ForumDTO;
import com.simplyalgos.backend.page.dto.FullForumDTO;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.UUID;


public interface ForumService {

    ObjectPagedList<ForumDTO> listForumPages(Pageable pageable);

    UUID createForum(ForumDTO forumDTO);

    void userLikedOrDisliked(UUID userId, UUID pageId, Boolean passedLikeDislike);

    UUID deleteForum(String pageId, String userId);

   FullForumDTO getForumPage(String pageId);

    UUID updateForum(ForumDTO forumDTO);

    void reportForum(PageReportDTO pageReportDTO);

    ObjectPagedList<ForumDTO> listForumPagesByTags(UUID tagId, Pageable pageable);
}
