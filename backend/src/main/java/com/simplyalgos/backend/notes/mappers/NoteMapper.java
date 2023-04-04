package com.simplyalgos.backend.notes.mappers;

import com.simplyalgos.backend.notes.domains.*;
import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.dtos.PublicNoteDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import org.mapstruct.*;

@DecoratedWith(NoteMapperDecorator.class)
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NoteMapper {

    // need to write out


    UserNoteDTO userNotesToUserNoteDTO(UserNotes userNotes);

    @Mapping(target = "canEdit", ignore = true)
    NoteShareDTO noteShareToNoteShareDTO(NoteShare noteShare);

    @Mapping(target = "canEdit", ignore = true)
    NoteShare noteShareDTOToNoteShare(NoteShareDTO noteShareDTO);

    @Mapping(source = "publicNote.noteId", target = "userNoteDTO.noteId")
    @Mapping(source = "publicNote.title", target = "userNoteDTO.title")
    PublicNoteDTO publicNoteToPublicNoteDTO(PublicNotes publicNotes);

//    issue with noteshare -> noteshare dto since dto is weird. But manually imp and works
    @Mapping(source = "note.noteId", target = "userNoteDTO.noteId")
    @Mapping(source = "note.title", target = "userNoteDTO.title")
    @Mapping(source = "noteShare.shareId", target = "noteShareDTO.shareId")
    FullShareNoteDTO noteShareToFullShareNoteDTO(NoteShare noteShare);




}

