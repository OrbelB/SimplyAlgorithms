package com.simplyalgos.backend.notes.mappers;

import com.simplyalgos.backend.notes.domains.NoteShare;
import com.simplyalgos.backend.notes.domains.PublicNotes;
import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.dtos.PublicNoteDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import com.simplyalgos.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class NoteMapperDecorator implements NoteMapper{

    private NoteMapper noteMapper;
    private UserService userService;




    @Override
    public UserNoteDTO userNoteToUserNoteDTO(UserNotes userNotes) {
        return noteMapper.userNoteToUserNoteDTO(userNotes);
    }

    @Override
    public NoteShareDTO noteShareToNoteShareDTO(NoteShare noteShare) {
        return NoteShareDTO.builder()
                .shareId(noteShare.getShareId())
                .ShareToUserName(noteShare
                        .getSharedTo()
                        .getUsername())
                .shareDate(noteShare.getShareDate())
                .expireDate(noteShare.getShareLength())
                .canEdit((noteShare.getCanEdit() == 1) ? (true) : (false))
                .build();
    }

    @Override
    public NoteShare noteShareDTOToNoteShare(NoteShareDTO noteShareDTO) {
        return null;
    }


//    @Override
//    public UserNotes userNoteDtoToUserNote(UserNoteDTO userNoteDTO) {
//        return noteMapper.userNoteDtoToUserNote(userNoteDTO);
//    }
//
//    @Override
//    public NoteShareDTO shareNoteToShareNoteDTO(NoteShare noteShare) {
//        return noteMapper.shareNoteToShareNoteDTO(noteShare);
//    }
//
//    @Override
//    public PublicNoteDTO publicNoteToPublicNoteDTO(PublicNotes publicNotes) {
//        return noteMapper.publicNoteToPublicNoteDTO(publicNotes);
//    }
}
