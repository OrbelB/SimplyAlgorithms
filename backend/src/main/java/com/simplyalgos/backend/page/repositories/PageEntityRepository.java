package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.PageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PageEntityRepository  extends JpaRepository<PageEntity, UUID> {

}
