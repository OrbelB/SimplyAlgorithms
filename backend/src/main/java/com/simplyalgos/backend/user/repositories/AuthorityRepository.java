package com.simplyalgos.backend.user.repositories;

import com.simplyalgos.backend.user.security.Authority;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AuthorityRepository extends JpaRepository<Authority, UUID> {
}
