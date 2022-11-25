package com.simplyalgos.backend.page;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface PageVoteRepository extends JpaRepository<PageVote, PageVoteId> {
    Optional<PageVote> findByPageVoteId(PageVoteId pageVoteId);

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE page_vote " +
            "SET like_dislike = :like_dislike " +
            "WHERE user_id = :user_id  AND page_id = :page_id")
    void updateLikeDislike(@Param("like_dislike") boolean likeDislike,
                           @Param("user_id") String userId,
                           @Param("page_id") String pageId);

    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM page_vote " +
            "WHERE like_dislike = :like_dislike AND page_id = :page_id")
    Optional<Integer> countLikeDislikeByPage(@Param("page_id") String pageId,
                                             @Param("like_dislike") boolean likeDislike);


    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM page_vote WHERE page_id = :page_id AND user_id = :user_id")
    void deleteVote(@Param("page_id") String pageId, @Param("user_id") String userId);

    Set<PageVote> findAllByPageVoteId_PageId(UUID pageVoteId_pageId);
}
