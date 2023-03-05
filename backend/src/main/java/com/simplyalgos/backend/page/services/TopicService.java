package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.domains.ids.PageVoteId;
import com.simplyalgos.backend.page.dtos.FullTopicDTO;
import com.simplyalgos.backend.page.dtos.LikeDislikeDTO;
import com.simplyalgos.backend.page.dtos.PageWikiInfo;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.Set;
import java.util.UUID;

public interface TopicService {

    Topic getTopic(UUID topicId);
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

    Set<PageWikiInfo> getWikiInfo(Set<UUID> pageIds);


    boolean isPageNameUnique(String pageName);

}
