package com.simplyalgos.backend.page;

import com.simplyalgos.backend.tag.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface PageEntityRepository  extends JpaRepository<PageEntity, UUID> {

}
