package com.simplyalgos.backend.notes.repositories;

import com.simplyalgos.backend.notes.domains.NoteShare;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface NoteShareRepository extends JpaRepository<NoteShare, UUID> {
}
