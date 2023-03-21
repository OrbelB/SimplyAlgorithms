package com.simplyalgos.backend.notes.repositories;

import com.simplyalgos.backend.notes.domains.UserNotes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserNoteRepository extends JpaRepository<UserNotes, UUID> {

//    Page<UserNotes> findAllByLastUpdated(Pageable pageable);
//
//    Page<UserNotes> findAllByCreatedDate(Pageable pageable);
//
    Page<UserNotes> findAllByIsPublic(Pageable pageable, short isPublic);
//
////    Don't know if this will work
    Page<UserNotes> findAllBySharedToExists(Pageable pageable);
}
