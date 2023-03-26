package com.simplyalgos.backend.notes.repositories;

import com.simplyalgos.backend.notes.domains.NoteShare;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface NoteShareRepository extends JpaRepository<NoteShare, UUID> {

    Optional<NoteShare> findBySharedTo_UserIdAndNote_NoteId(UUID userId, UUID noteId);
    boolean existsBySharedTo_UserIdAndNote_NoteId(UUID userid, UUID noteId);

    boolean existsByNote_NoteId(UUID noteId);

    void deleteAllByNote_NoteId(UUID noteId);

    Page<NoteShare> findAllBySharedTo_UserId(UUID userId, Pageable pageable);

    Page<NoteShare> findAllByNote_NoteId(UUID noteId, Pageable pageable);



}
