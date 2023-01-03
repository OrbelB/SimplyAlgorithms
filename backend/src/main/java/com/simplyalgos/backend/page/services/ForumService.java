package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.page.domains.PageVoteId;
import com.simplyalgos.backend.page.dto.ForumDTO;
import com.simplyalgos.backend.page.dto.FullForumDTO;
import com.simplyalgos.backend.page.dto.LikeDislikeDTO;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;


public interface ForumService {

    ObjectPagedList<?> listForumPages(Pageable pageable);

    UUID createForum(ForumDTO forumDTO);

    LikeDislikeDTO userLikedOrDisliked(UUID userId, UUID pageId, boolean passedLikeDislike);

    UUID deleteForum(String pageId, String userId);

   FullForumDTO getForumPage(String pageId);

    FullForumDTO updateForum(ForumDTO forumDTO);

    UUID reportForum(PageReportDTO pageReportDTO);

    PageVoteId deleteVote(UUID userId, UUID pageId);

    ObjectPagedList<ForumDTO> listForumPagesByTags(UUID tagId, Pageable pageable);

    Object listVotesByPage(UUID pageId);

    FullForumDTO addForumUserView(UUID userId, UUID pageId);


    List<?> listForumsByUserViewForums(UUID userId, Pageable pageable);
}
