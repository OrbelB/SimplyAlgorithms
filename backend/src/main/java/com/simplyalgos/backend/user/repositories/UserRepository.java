package com.simplyalgos.backend.user.repositories;


import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.security.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {


    Optional<User> findByUsername(String username);

    Set<User> findAllByRolesIn(Set<Role> roles);

    boolean existsByUsername(String username);

    Optional<User> findByEmail(String email);


    <T> Page<T> findAllProjectedBy(Pageable pageable, Class<T> type);

    boolean existsByEmail(String email);
}
