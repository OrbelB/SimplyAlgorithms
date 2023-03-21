package com.simplyalgos.backend.notes.repositories;

import com.simplyalgos.backend.notes.domains.PublicNotes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PublicNoteRepository extends JpaRepository <PublicNotes, UUID> {

    Optional<PublicNotes> findByPublicNote_NoteId(UUID noteId);

    boolean existsByPublicNote_NoteId(UUID noteId);

    void deleteByPublicNote_NoteId(UUID noteId);



}
