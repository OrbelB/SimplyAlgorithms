package com.simplyalgos.backend.notes.mappers;

import com.simplyalgos.backend.notes.domains.NoteShare;
import com.simplyalgos.backend.notes.domains.PublicNotes;
import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.dtos.PublicNoteDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import org.mapstruct.*;

@DecoratedWith(NoteMapperDecorator.class)
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NoteMapper {

    // need to write out

    UserNoteDTO userNoteToUserNoteDTO(UserNotes userNotes);

    @Mapping(target = "canEdit", ignore = true)
    NoteShareDTO noteShareToNoteShareDTO(NoteShare noteShare);

    @Mapping(target = "canEdit", ignore = true)
    NoteShare noteShareDTOToNoteShare(NoteShareDTO noteShareDTO);

    @Mapping(source = "publicNote.noteId", target = "userNoteDTO.noteId")
    PublicNoteDTO publicNoteToPublicNoteDTO(PublicNotes publicNotes);


//    UserNotes userNoteDtoToUserNote(UserNoteDTO userNoteDTO);
//
//    NoteShareDTO shareNoteToShareNoteDTO(NoteShare noteShare);
//
//    PublicNoteDTO publicNoteToPublicNoteDTO(PublicNotes publicNotes);


}

