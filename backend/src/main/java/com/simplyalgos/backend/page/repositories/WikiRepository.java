package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.Wiki;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface WikiRepository extends JpaRepository<Wiki, UUID> {
}
