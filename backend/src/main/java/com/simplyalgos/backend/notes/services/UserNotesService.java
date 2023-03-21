package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.FullPublicNoteDTO;
import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;

import java.util.UUID;

public interface UserNotesService {

    UserNoteDTO createNotePage(UserNoteDTO userNoteDTO);

    UserNoteDTO updateUserNote(UserNoteDTO userNoteDTO);

    FullShareNoteDTO updateSharedUserNote(FullShareNoteDTO fullShareNoteDTO);

    boolean deleteNotePage(UUID noteId);

    UserNoteDTO getUserNoteDTO(UUID noteId);

    UserNotes getUserNotes(UUID noteId);

    FullShareNoteDTO getSharedNote(UUID shareId, UUID noteId);
    FullPublicNoteDTO getPublicNoteUserNote(UUID noteId);


    //  will update the is_public column on sql
    boolean makeNotePublic(UUID noteId);
    boolean makeNotePrivate(UUID noteId);

}
