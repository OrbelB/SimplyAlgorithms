package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

public interface NotePageRetrievalService {

    //    will return UserListDTO
    ObjectPagedList<?> ListUserNotes(Pageable pageable);

    ObjectPagedList<?> listUserNotesByLastUpdated(Pageable pageable);

    ObjectPagedList<?> listUserNotesByOldest(Pageable pageable);

    ObjectPagedList<?> listUserNotesByNewest(Pageable pageable);



    //    Will return FullSharedNoteDTO
    ObjectPagedList<?> listSharedNotes(Pageable pageable);

    ObjectPagedList<?> listSharedNotesWithEditGranted(Pageable pageable);

    ObjectPagedList<?> listNewestSharedNote(Pageable pageable);

    ObjectPagedList<?> listOldestSharedNote(Pageable pageable);

    ObjectPagedList<?> listShareNoteByEarliestExpireDate(Pageable pageable);


    ObjectPagedList<?> listPublicNotes(Pageable pageable);

    ObjectPagedList<?> listPublicNotesByNewestShareDate(Pageable pageable);

    ObjectPagedList<?> listPublicNotesByOldestShareDate(Pageable pageable);
}
