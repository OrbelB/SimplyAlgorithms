package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface TopicRepository extends JpaRepository<Topic, UUID> {

    <T> Set<T> findAllByPageIdNotIn(Set<UUID> topicId, Class<T> type);

    <T> Optional<T> findByPageId(UUID pageId, Class<T> type);

    <T> Optional<T> findByTitle(String title, Class<T> type);

    boolean existsByTitle(String title);


    @Modifying
    @Query(nativeQuery = true, value = "UPDATE topic_page SET url_path = :url_path  where page_id = :page_id")
    void updateUrlPath(@Param("page_id") UUID pageId, @Param("url_path") String urlPath);


}
