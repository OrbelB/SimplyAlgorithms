package com.simplyalgos.backend.notes.repositories;

import com.simplyalgos.backend.notes.domains.UserNotes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserNoteRepository extends JpaRepository<UserNotes, UUID> {

    Page<UserNotes> findAllByIsPublic(Pageable pageable, short isPublic);

    //
////    Don't know if this will work
    Page<UserNotes> findAllBySharedToExists(Pageable pageable);


    <T> Page<T> findAllByCreatedBy_UserIdAndTitleStartingWith(UUID userId, String title, Pageable pageable, Class<T> type);

    Page<UserNotes> findAllByCreatedBy_UserId(UUID userId, Pageable pageable);
}
