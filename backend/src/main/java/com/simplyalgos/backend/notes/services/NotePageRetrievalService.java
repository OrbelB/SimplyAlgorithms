package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

public interface NotePageRetrievalService {

    //    will return UserListDTO
    ObjectPagedList<?> ListUserNotes(Pageable pageable);

//    ObjectPagedList<?> listUserNotesByLastUpdated(Pageable pageable);
//
//    ObjectPagedList<?> listUserNotesByCreatedDate(Pageable pageable);

    ObjectPagedList<?> ListUserNotesByIsPublic(Pageable pageable, short isPublic);

    ObjectPagedList<?> ListUserNotesByIsSharedToOtherUsers(Pageable pageable);



    //    Will return FullSharedNoteDTO
    ObjectPagedList<?> listSharedNotes(Pageable pageable);

    ObjectPagedList<?> listSharedNotesWithEditGranted(Pageable pageable, short canEdit);

    ObjectPagedList<?> listShareNoteByExpireDateDesc(Pageable pageable);

    ObjectPagedList<?> listShareNoteByExpireDateAcs(Pageable pageable);

    ObjectPagedList<?> listShareNoteByShareDateDesc(Pageable pageable);

    ObjectPagedList<?> listShareNoteByShareDateAcs(Pageable pageable);







    ObjectPagedList<?> listPublicNotes(Pageable pageable);

}
