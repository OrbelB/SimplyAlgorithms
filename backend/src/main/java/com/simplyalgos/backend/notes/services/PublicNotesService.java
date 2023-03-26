package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.domains.PublicNotes;
import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.dtos.PublicNoteDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface PublicNotesService {

    ObjectPagedList<?> listPublicNotes(Pageable pageable);

    PublicNoteDTO makeNotePublic(PublicNoteDTO publicNoteDTO, UserNotes userNotes);

    //    will delete the tuple in the table
    void makeNotePrivateUsingPublicShareId(UUID shareId);
    void makeNotePrivateUsingNoteId(UUID noteId);

//    will delete the tuple when the flag is set to 0 on the
    PublicNoteDTO updatePublicNoteDescriptionUsingPublicShareId(PublicNoteDTO publicNoteDTO);

    PublicNoteDTO updatePublicNoteDescriptionUsingNoteId(PublicNoteDTO publicNoteDTO);


    PublicNoteDTO getPublicNoteInformationUsingPublicShareId(UUID publicShareId);

    PublicNoteDTO getPublicNoteDTOUsingNoteId(UUID noteId);

    PublicNotes getPublicNoteUsingNoteId(UUID noteId);




}
