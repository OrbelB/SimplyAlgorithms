package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.Wiki;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface WikiRepository extends JpaRepository<Wiki, UUID> {

    boolean existsByWikiName(String name);

    Optional<Wiki> getWikiByWikiName(String name);

    <T> Set<T> findAllByWikiIdNotIn(Set<UUID> wikiIds, Class<T> type);

    <T> Set<T> findAllByIsParentChild(String isParentChild, Class<T> type);
}
