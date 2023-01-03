package com.simplyalgos.backend.page.services;


import com.simplyalgos.backend.page.domains.PageVoteId;
import com.simplyalgos.backend.page.dto.LikeDislikeDTO;



import java.util.Set;
import java.util.UUID;

public interface PageVoteService {

    LikeDislikeDTO addPageVote(LikeDislikeDTO likeDislikeDTO);

    Integer countVotes(UUID pageId, boolean vote);

    void deletePageVote(UUID userId, UUID pageId);

    boolean pageVoteExists(PageVoteId pageVoteId);

    Set<?> listVotesByPage(UUID pageId);
}
