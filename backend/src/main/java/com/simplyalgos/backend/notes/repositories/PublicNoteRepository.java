package com.simplyalgos.backend.notes.repositories;

import com.simplyalgos.backend.notes.domains.PublicNotes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PublicNoteRepository extends JpaRepository <PublicNotes, UUID> {
}
