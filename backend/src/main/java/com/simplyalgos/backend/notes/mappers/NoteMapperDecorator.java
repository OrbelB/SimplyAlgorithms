package com.simplyalgos.backend.notes.mappers;

import com.simplyalgos.backend.notes.domains.*;
import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.dtos.PublicNoteDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
@Slf4j
@RequiredArgsConstructor
@Setter
public class NoteMapperDecorator implements NoteMapper{

    @Autowired
    private NoteMapper noteMapper;
//    gets unassigned when it is set to private.
    @Override
    public UserNoteDTO userNotesToUserNoteDTO(UserNotes userNotes) {
        return noteMapper.userNotesToUserNoteDTO(userNotes);
    }

    @Override
    public NoteShareDTO noteShareToNoteShareDTO(NoteShare noteShare) {
        return NoteShareDTO.builder()
                .shareId(noteShare.getShareId())
                .shareToUserName(noteShare
                        .getSharedTo()
                        .getUsername())
                .shareToUserId(noteShare.getSharedTo().getUserId())
                .shareDate(noteShare.getShareDate())
                .expireDate(noteShare.getShareLength())
                .canEdit((noteShare.getCanEdit() == 1) ? (true) : (false))
                .build();
    }

    @Override
    public NoteShare noteShareDTOToNoteShare(NoteShareDTO noteShareDTO) {
        return noteMapper.noteShareDTOToNoteShare(noteShareDTO) ;
    }

    @Override
    public PublicNoteDTO publicNoteToPublicNoteDTO(PublicNotes publicNotes) {
        return noteMapper.publicNoteToPublicNoteDTO(publicNotes);
    }

    @Override
    public FullShareNoteDTO noteShareToFullShareNoteDTO(NoteShare noteShare) {
        if ( noteShare == null ) {
            return null;
        }

        FullShareNoteDTO.FullShareNoteDTOBuilder fullShareNoteDTO = FullShareNoteDTO.builder();

        if ( noteShare.getNote() != null ) {
            fullShareNoteDTO.userNoteDTO( userNotesToUserNoteDTO( noteShare.getNote() ) );
        }
        if ( noteShare != null ) {
            fullShareNoteDTO.noteShareDTO( noteShareToNoteShareDTO( noteShare ) );
        }

        return fullShareNoteDTO.build();
    }


}
