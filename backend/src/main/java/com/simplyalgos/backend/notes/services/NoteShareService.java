package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.dtos.NoteShareDTO;

import java.util.List;
import java.util.UUID;

public interface NoteShareService {

//    share a note with another user
    NoteShareDTO shareNoteToUser(NoteShareDTO noteShareDTO);

    //    will basically delete the tuple from table
    NoteShareDTO unShareNote(NoteShareDTO noteShareDTO);

    //will update the share length & the edit permissions
    NoteShareDTO updateShareStatus(NoteShareDTO noteShareDTO);

    boolean removeEditPermission(NoteShareDTO noteShareDTO);

    boolean grantEditPermission(NoteShareDTO noteShareDTO);

//    if expired then it will return a message in
//    errorSharedNoteMessage & flag hasError
    NoteShareDTO getNoteShareInformation(UUID userId, UUID noteId);


//  How to get shared notes
//  while calling ListSharedNotes first call this method below
//    this method will return all of the shared notes that the user has access too
//    using the NoteShareDTO call getSpecificNotes to get the notes that are shared with the user
//    return the ObjectPagedList with the shared notes
    List<NoteShareDTO> getAllSharedNoteInformation(UUID userId);

}
