package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.dtos.PublicNoteDTO;

import java.util.UUID;

public interface PublicNotesService {

    PublicNoteDTO makeNotePublic(PublicNoteDTO publicNoteDTO);

    //    will delete the tuple in the table
    void makeNotePrivateUsingPublicShareId(UUID shareId);
    void makeNotePrivateUsingNoteId(UUID noteId);

//    will delete the tuple when the flag is set to 0 on the
    PublicNoteDTO updatePublicNoteDescriptionUsingPublicShareId(PublicNoteDTO publicNoteDTO);

    PublicNoteDTO updatePublicNoteDescriptionUsingNoteId(PublicNoteDTO publicNoteDTO);


    PublicNoteDTO getPublicNoteInformationUsingPublicShareId(UUID publicShareId);

    PublicNoteDTO getPublicNoteInformationUsingNoteId(UUID noteId);




}
