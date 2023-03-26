package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface NoteShareService {

    //    List the people who have been given access to the note
    ObjectPagedList<?> listSharedTooUsers(UUID noteId ,Pageable pageable);

    ObjectPagedList<?> listSharedNotes(UUID userId, Pageable pageable);

//    share a note with another user
    NoteShareDTO shareNoteToUser(FullShareNoteDTO fullShareNoteDTO);

    //    will basically delete the tuple from table
    boolean unShareNote(NoteShareDTO noteShareDTO);

    //will update the share length
    NoteShareDTO updateExpireDate(NoteShareDTO noteShareDTO);

//    boolean removeEditPermission(UUID shareId);

    boolean updateEditPermission(UUID shareId);

//    if expired then it will return a message in
//    errorSharedNoteMessage & flag hasError
//    will delete the current tuple
    NoteShareDTO getNoteShareInformation(UUID shareId);

//    checks if the shareLength is expired
    boolean canAccessSharedNote(UUID shareId);

    UUID getNoteID(UUID shareId);


//  How to get shared notes
//  while calling ListSharedNotes first call this method below
//    this method will return all of the shared notes that the user has access too
//    using the NoteShareDTO call getSpecificNotes to get the notes that are shared with the user
//    return the ObjectPagedList with the shared notes
//    List<NoteShareDTO> getAllSharedNoteInformation(UUID userId);

}
