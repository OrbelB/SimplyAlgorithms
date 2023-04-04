package com.simplyalgos.backend.notes.repositories;

import com.simplyalgos.backend.notes.domains.PublicNotes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;
import java.util.UUID;


public interface PublicNoteRepository extends JpaRepository <PublicNotes, UUID> {

    Optional<PublicNotes> findByPublicNote_NoteId(UUID noteId);

    <T> Page<T> findAllByPublicNote_TitleStartingWith(String title, Pageable pageable, Class<T> type);

    boolean existsByPublicNote_NoteId(UUID noteId);

    @Modifying
    void deleteByPublicNote_NoteId(UUID noteId);




}
