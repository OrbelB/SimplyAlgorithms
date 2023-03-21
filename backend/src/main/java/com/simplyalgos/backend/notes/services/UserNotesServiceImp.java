package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.exceptions.UserNotAuthorizedException;
import com.simplyalgos.backend.exceptions.UserNoteIsAlreadyPrivateException;
import com.simplyalgos.backend.exceptions.UserNoteIsAlreadyPublicException;
import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.*;
import com.simplyalgos.backend.notes.mappers.NoteMapper;
import com.simplyalgos.backend.notes.repositories.UserNoteRepository;
import com.simplyalgos.backend.user.mappers.UserMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.MessageFormat;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class UserNotesServiceImp implements UserNotesService{

    private  final NoteShareService noteShareService;
    private final PublicNotesService publicNotesService;
    private final UserNoteRepository userNoteRepository;
    private final UserMapper userMapper;
    private final NoteMapper noteMapper;

//    Implimented
//    Note tested
    @Override
    public UserNoteDTO createNotePage(UserNoteDTO userNoteDTO) {
        Timestamp currentTimeStamp = new Timestamp(new Date().getTime());
        UserNotes userNotes =  userNoteRepository.saveAndFlush(
                UserNotes.builder()
                        .createdBy(userMapper.userDtoToUser(userNoteDTO.getCreatedBy()))
                        .noteBody(userNoteDTO.getNoteBody())
                        .title(userNoteDTO.getNoteTitle())
                        .isPublic(userNoteDTO.getIsPublic())
                        .createdDate(currentTimeStamp)
                        .lastUpdated(currentTimeStamp)
                        .build()
        );
        return noteMapper.userNoteToUserNoteDTO(userNotes);
    }


//    This function will not make note public or private or deal with the sharing functionality
    @Override
    public UserNoteDTO updateUserNote(UserNoteDTO userNoteDTO) {
        Optional<UserNotes> userNotesOptional = userNoteRepository.findById(userNoteDTO.getNoteId());
        if(!userNotesOptional.isPresent()){
            throw new NoSuchElementException(
                    MessageFormat.format("note with Id {0} not found ", userNoteDTO.getNoteId()));
        }
        Timestamp currentTimeStamp = new Timestamp(new Date().getTime());

        userNotesOptional.get().setNoteBody(userNoteDTO.getNoteBody());
        userNotesOptional.get().setTitle(userNoteDTO.getNoteTitle());
        userNotesOptional.get().setLastUpdated(currentTimeStamp);
        userNoteRepository.saveAndFlush(userNotesOptional.get());
        return noteMapper.userNoteToUserNoteDTO(userNotesOptional.get());
    }

    @Override
    public FullShareNoteDTO updateSharedUserNote(FullShareNoteDTO fullShareNoteDTO) {
        UserNoteDTO userNotesDTO = getUserNoteDTO(fullShareNoteDTO.getUserNoteDTO().getNoteId());
        NoteShareDTO noteShareDTO = noteShareService.getNoteShareInformation(userNotesDTO.getCreatedBy().getUserId(), userNotesDTO.getNoteId());

        if(noteShareDTO.isCanEdit() == false && noteShareService.canAccessSharedNote(noteShareDTO.getShareId())){
            throw new UserNotAuthorizedException(MessageFormat
                    .format("User with user Id {0} does not have permission to update shared notes ", noteShareDTO.getShareToUserId()));
        }
        return FullShareNoteDTO.builder()
                .userNoteDTO(updateUserNote(fullShareNoteDTO.getUserNoteDTO()))
                .noteShareDTO(noteShareDTO)
                .build();
    }

    @Override
    public boolean deleteNotePage(UUID noteId) {
        if(!userNoteRepository.existsById(noteId)){
            throw new NoSuchElementException(
                    MessageFormat.format("note with Id {0} not found ", noteId));
        }
        userNoteRepository.deleteById(noteId);
        return true;
    }

    @Override
    public UserNoteDTO getUserNoteDTO(UUID noteId) {
        return noteMapper.userNoteToUserNoteDTO(userNoteRepository.findById(noteId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("note with Id {0} not found", noteId))
        ));
    }

    @Override
    public UserNotes getUserNotes(UUID noteId) {
        return userNoteRepository.findById(noteId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("note with Id {0} not found", noteId))
        );
    }

    //    use this to get notes that are shared
    @Override
    public FullShareNoteDTO getSharedNote(UUID shareId, UUID noteId) {
        if(!noteShareService.canAccessSharedNote(shareId)){
            return FullShareNoteDTO.builder()
                    .noteShareDTO(NoteShareDTO.builder()
                            .hasError(true)
                            .errorSharedNoteMessage("Cannot access shared Note, " +
                                    "Please contact note owner for info")
                            .build())
                    .build();
        }
        Optional<UserNotes> userNotesOptional =
                userNoteRepository.findById(noteId);
        if(!userNotesOptional.isPresent()){
            throw new NoSuchElementException(
                    MessageFormat.format("note with Id {0} not found ", noteId));
        }

        return FullShareNoteDTO.builder()
                .noteShareDTO(noteShareService
                        .getNoteShareInformation(userNotesOptional.get().getCreatedBy().getUserId(), noteId))
                .userNoteDTO(noteMapper
                        .userNoteToUserNoteDTO(userNotesOptional.get()))
                .build();
    }

    @Override
    public FullPublicNoteDTO getPublicNoteUserNote(UUID noteId) {
        Optional<UserNotes> userNotesOptional = userNoteRepository.findById(noteId);
        if(userNotesOptional.isPresent() && userNotesOptional.get().getIsPublic() == 1){
            return FullPublicNoteDTO.builder()
                    .publicNoteDTO(publicNotesService.getPublicNoteInformationUsingNoteId(noteId))
                    .userNoteDTO(noteMapper.userNoteToUserNoteDTO(userNotesOptional.get()))
                    .build();
        }
        throw new NoSuchElementException(
                MessageFormat.format("note with Id {0} not found or Note is note public", noteId));
    }


    @Override
    public boolean makeNotePublic(UUID noteId) {
        Optional<UserNotes> userNotesOptional = userNoteRepository
                .findById(noteId);
        if(!userNotesOptional.isPresent()){
            throw new NoSuchElementException(
                    MessageFormat.format("note with Id {0} not found", noteId));
        }
        if(userNotesOptional.get().getIsPublic() == 0){
            throw new UserNoteIsAlreadyPublicException(
                    MessageFormat.format("note with Id {0} is already public", noteId));
        }
        userNotesOptional.get().setIsPublic((short)1);
        userNoteRepository.saveAndFlush(userNotesOptional.get());
        return true;
    }

    @Override
    public boolean makeNotePrivate(UUID noteId) {
        Optional<UserNotes> userNotesOptional = userNoteRepository
                .findById(noteId);
        if(!userNotesOptional.isPresent()){
            throw new NoSuchElementException(
                    MessageFormat.format("note with Id {0} not found", noteId));
        }
        if(userNotesOptional.get().getIsPublic() == 1){
            throw new UserNoteIsAlreadyPrivateException(
                    MessageFormat.format("note with Id {0} is already private", noteId));
        }
        userNotesOptional.get().setIsPublic((short)0);
        userNoteRepository.saveAndFlush(userNotesOptional.get());
        return true;
    }

}
