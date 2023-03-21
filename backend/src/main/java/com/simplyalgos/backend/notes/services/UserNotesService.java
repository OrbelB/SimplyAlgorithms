package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.FullPublicNoteDTO;
import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.RequestSharedNoteDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface UserNotesService {

    UserNoteDTO createNotePage(UserNoteDTO userNoteDTO);

    UserNoteDTO updateUserNote(UserNoteDTO userNoteDTO);

    FullShareNoteDTO updateSharedUserNote(FullShareNoteDTO fullShareNoteDTO);

    void deleteNotePage(UUID noteId);

    UserNoteDTO getUserNoteDTO(UUID noteId);

    UserNotes getUserNotes(UUID noteId);

    FullShareNoteDTO getSharedNote(RequestSharedNoteDTO requestSharedNoteDTO);
    FullPublicNoteDTO getPublicNoteUserNote(UUID noteId);


    //  will update the is_public column on sql
    boolean makeNotePublic(UUID noteId);
    boolean makeNotePrivate(UUID noteId);

}
