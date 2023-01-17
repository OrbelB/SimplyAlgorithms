package com.simplyalgos.backend.tag.repositories;

import com.simplyalgos.backend.tag.domains.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {


    @Modifying
    @Query(nativeQuery = true,
            value = "DELETE FROM page_tag WHERE tag_id = :tag_id AND page_id = :page_id")
    void removeTagPageMappingIfNotPresent(@Param("tag_id") String tagId,
                                          @Param("page_id") String pageId);

    List<Tag> findAllByTagIdIsNotIn(Collection<UUID> tagId);

    Set<Tag> findAllByTagStartingWith(String tag);
}
