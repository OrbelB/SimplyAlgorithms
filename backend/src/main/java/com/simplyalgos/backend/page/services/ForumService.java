package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.page.domains.ids.PageVoteId;
import com.simplyalgos.backend.page.dtos.ForumDTO;
import com.simplyalgos.backend.page.dtos.FullForumDTO;
import com.simplyalgos.backend.page.dtos.LikeDislikeDTO;
import com.simplyalgos.backend.page.repositories.projection.ForumInformation;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;


public interface ForumService {

    ObjectPagedList<?> listForumPages(Pageable pageable);

    ObjectPagedList<?> filterForumsByTag(Pageable pageable, String tag);

    UUID createForum(ForumDTO forumDTO);

    ObjectPagedList<ForumInformation> filterForumsByTitle(Pageable pageable, String title);

    LikeDislikeDTO userLikedOrDisliked(UUID userId, UUID pageId, boolean passedLikeDislike);

    UUID deleteForum(String pageId, String userId);

    ForumInformation getForumPage(String pageId);
    FullForumDTO updateForum(ForumDTO forumDTO);

    UUID reportForum(PageReportDTO pageReportDTO);

    PageVoteId deleteVote(UUID userId, UUID pageId);

    ObjectPagedList<ForumInformation> listForumsByTagId(UUID tagId, Pageable pageable);

    Object listVotesByPage(UUID pageId);

    Object getForumVoteByPageAndUserId(UUID pageId, UUID userId);
    ForumInformation addForumUserView(UUID userId, UUID pageId);

    List<?> listForumsByUserViewForums(UUID userId, Pageable pageable);
}
