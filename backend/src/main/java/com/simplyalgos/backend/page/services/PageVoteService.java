package com.simplyalgos.backend.page.services;


import com.simplyalgos.backend.page.domains.ids.PageVoteId;
import com.simplyalgos.backend.page.dtos.LikeDislikeDTO;



import java.util.Set;
import java.util.UUID;

public interface PageVoteService {

    LikeDislikeDTO addPageVote(LikeDislikeDTO likeDislikeDTO);

    Integer countVotes(UUID pageId, boolean vote);

    void deletePageVote(UUID userId, UUID pageId);

    boolean pageVoteExists(PageVoteId pageVoteId);

    @Deprecated
    Set<?> listVotesByPage(UUID pageId);

    Set<?> listVoteByPageAndUserId(UUID pageId, UUID userId);
}
