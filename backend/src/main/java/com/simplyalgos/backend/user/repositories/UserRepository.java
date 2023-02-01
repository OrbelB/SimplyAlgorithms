package com.simplyalgos.backend.user.repositories;


import com.simplyalgos.backend.user.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByUsername(String username);


    Optional<User> findByEmail(String email);
}
