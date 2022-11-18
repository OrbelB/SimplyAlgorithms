package com.simplyalgos.backend.page;

import com.simplyalgos.backend.page.dto.FullTopicDTO;
import com.simplyalgos.backend.page.dto.LikeDislikeDTO;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface TopicService  {

    ObjectPagedList<?> listTopicPages(Pageable pageable);

     FullTopicDTO getTopicPage(UUID pageId);

     void updateTopicPage(FullTopicDTO fullTopicDTO);

    UUID reportPage(PageReportDTO pageReportDTO);

     void createPage(FullTopicDTO fullTopicDTO);

     LikeDislikeDTO userLikedOrDisliked(UUID userId, UUID pageId, boolean passedLikeDislike);

     ObjectPagedList<?> listTopicPagesByTags(UUID tagId, Pageable pageable);

     void deleteTopicPage(UUID pageId, UUID userId);

     PageVoteId deleteVote(UUID userId, UUID pageId);
     Object listVotesByPage(UUID pageId);

}
