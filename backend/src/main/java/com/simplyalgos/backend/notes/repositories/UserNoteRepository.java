package com.simplyalgos.backend.notes.repositories;

import com.simplyalgos.backend.notes.domains.UserNotes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserNoteRepository extends JpaRepository<UserNotes, UUID> {
}
