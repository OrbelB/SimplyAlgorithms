package com.simplyalgos.backend.user.repositories;

import com.simplyalgos.backend.user.security.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {

    Optional<Role> getRoleByRoleName(String roleName);

    Optional<Role> findRoleByRoleName(String roleName);
    boolean existsByRoleName(String roleName);
    <T> Set<T> findAllProjectedBy(Class<T> type);
}
