package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface UserNotesService {

    ObjectPagedList<?> listUserNotes(UUID userId, Pageable pageable);

    UserNoteDTO savePublicNote(UUID userId, UUID noteId);

    UserNoteDTO createNotePage(UserNoteDTO userNoteDTO);

    UserNoteDTO updateUserNote(UserNoteDTO userNoteDTO);

    FullShareNoteDTO updateSharedUserNote(FullShareNoteDTO fullShareNoteDTO);

    boolean deleteNotePage(UUID noteId);

    UserNoteDTO getUserNoteDTO(UUID noteId);

    UserNotes getUserNotes(UUID noteId);

    FullShareNoteDTO getSharedNote(UUID shareId, UUID noteId);
//    PublicNoteDTO getPublicNoteUserNote(UUID noteId);

    //  will update the is_public column on sql
    UserNotes makeNotePublic(UUID noteId);
    boolean makeNotePrivate(UUID noteId);

}
