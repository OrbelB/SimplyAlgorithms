package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.Forum;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface ForumRepository extends JpaRepository<Forum, UUID> {

    @Modifying
    @Query(value = "INSERT INTO forum_page(page_id, title, description_text, photo, video, user_id)" +
            " VALUES (:page_id, :title, :description_text, :photo, :video, :user_id)", nativeQuery = true)
    Optional<Forum> createForum(@Param("page_id") String pageId,
                     @Param("title") String title,
                     @Param("description_text") String descriptionText,
                     @Param("photo") String photo,
                     @Param("video") String video,
                     @Param("user_id") String userId
    );





    @Modifying
    @Query(value = "DELETE FROM forum_page WHERE page_id = :page_id", nativeQuery = true)
    void deleteByPageID(@Param("page_id") String pageId);


    Page<Forum> findAllByPageEntityId_Tags_TagId(UUID tag_id,Pageable pageable);

    Page<Forum> findAllByPageEntityId_Tags_Tag(String tag, Pageable pageable);
}
