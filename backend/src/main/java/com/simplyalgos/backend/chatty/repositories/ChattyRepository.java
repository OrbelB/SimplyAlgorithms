package com.simplyalgos.backend.chatty.repositories;

import com.simplyalgos.backend.chatty.domain.Chatty;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ChattyRepository extends JpaRepository<Chatty, UUID> {


    Optional<Chatty> findByProfileEnabled(short enabled);
}
