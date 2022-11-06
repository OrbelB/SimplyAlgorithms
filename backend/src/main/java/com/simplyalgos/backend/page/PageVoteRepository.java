package com.simplyalgos.backend.page;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PageVoteRepository extends JpaRepository<PageVote, PageVoteId> {
    Optional<PageVote> findByPageVoteId(PageVoteId pageVoteId);

    @Modifying
    @Query(nativeQuery = true, value = "UPDATE page_vote " +
            "SET like_dislike = :like_dislike " +
            "WHERE user_id = :user_id  AND page_id = :page_id")
    void updateLikeDislike(@Param("like_dislike") Boolean likeDislike,
                           @Param("user_id") String userId,
                           @Param("page_id") String pageId);


    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM page_vote " +
            "WHERE like_dislike = :like_dislike AND page_id = :page_id")
    Optional<Integer> countLikeDislikeByPage(@Param("page_id") String pageId,
                                             @Param("like_dislike") boolean likeDislike);


}
