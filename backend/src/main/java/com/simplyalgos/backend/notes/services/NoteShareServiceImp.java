package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.exceptions.AlreadySharedNoteWithUserException;
import com.simplyalgos.backend.exceptions.AlreadyUnSharedNoteWithUserException;
import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.exceptions.NoteErrorException;
import com.simplyalgos.backend.notes.domains.NoteShare;
import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.dtos.RequestSharedNoteDTO;
import com.simplyalgos.backend.notes.mappers.NoteMapper;
import com.simplyalgos.backend.notes.repositories.NoteShareRepository;
import com.simplyalgos.backend.notes.repositories.UserNoteRepository;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.mappers.UserMapper;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.utils.StringUtils;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class NoteShareServiceImp implements NoteShareService{

    private final NoteMapper noteMapper;
    private final UserService userService;
    private final NoteShareRepository noteShareRepository;
    private final UserNoteRepository userNoteRepository;

//    will check if note is public.
//    cannot share public notes
    @Override
    public NoteShareDTO shareNoteToUser(FullShareNoteDTO fullShareNoteDTO) {
        if(StringUtils.isNotNullAndEmptyOrBlank(fullShareNoteDTO.getNoteShareDTO().getShareToUserName())){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("username field must be filled received: {0}",fullShareNoteDTO
                                    .getNoteShareDTO().getShareToUserName()));
        }
        User shareTo = userService.getUserByUsername(fullShareNoteDTO.getNoteShareDTO().getShareToUserName());
        Optional<UserNotes> userNote = userNoteRepository.findById(fullShareNoteDTO.getUserNoteDTO().getNoteId());
        if(!userNote.isPresent() && userNote.get().getIsPublic() == 0){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("Note with note Id {0} not found or note is public", fullShareNoteDTO
                                    .getUserNoteDTO().getNoteId()));
        }
        if(!noteShareRepository.existsBySharedTo_UserIdAndNote_NoteId(shareTo.getUserId(), userNote.get()
                .getNoteId())){
            throw new AlreadySharedNoteWithUserException(MessageFormat
                    .format("Already shared Note with user {0}", fullShareNoteDTO
                            .getNoteShareDTO().getShareToUserName()));
        }

        NoteShare noteShare = noteShareRepository.saveAndFlush(NoteShare
                .builder()
                        .note(userNote.get())
                        .sharedTo(shareTo)
                        .canEdit(
                                (fullShareNoteDTO.getNoteShareDTO().isCanEdit())
                        ? ((short)1) : ((short)0))
                        .shareLength(createShareLength(fullShareNoteDTO
                                .getNoteShareDTO()
                                .getNumberOfDaysToShare()))
                .build());
        return noteMapper.noteShareToNoteShareDTO(noteShare);
    }

    @Override
    public boolean unShareNote(NoteShareDTO noteShareDTO) {
        if(StringUtils.isNotNullAndEmptyOrBlank(noteShareDTO.getShareToUserName())){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("user with username {0} not found", noteShareDTO.getShareToUserName()));
        }
        if(!noteShareRepository.existsById(noteShareDTO.getShareId())){
            throw new AlreadyUnSharedNoteWithUserException(
                    MessageFormat
                            .format("Note is note shared with user specified", noteShareDTO.getShareToUserName()));
        }
        noteShareRepository.deleteById(noteShareDTO.getShareId());
        return true;
    }

    @Override
    public NoteShareDTO updateExpireDate(NoteShareDTO noteShareDTO) {
        Optional<NoteShare> noteShare = noteShareRepository.findById(noteShareDTO.getShareId());
        if(!noteShare.isPresent()){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("share with shareId {0} does not exists", noteShareDTO.getShareId()));
        }

        noteShare.get().setShareLength(increaseShareDate(
                noteShare.get().getShareLength(),
                noteShareDTO.getNumberOfDaysToShare()));

        return noteMapper.noteShareToNoteShareDTO(
                noteShareRepository.saveAndFlush(
                        noteShare.get()));
    }

    @Override
    public void removeEditPermission(NoteShareDTO noteShareDTO) {
        Optional<NoteShare> noteShare = noteShareRepository.findById(noteShareDTO.getShareId());
        if(!noteShare.isPresent()){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("share with shareId {0} does not exists", noteShareDTO.getShareId()));
        }
        noteShare.get().setCanEdit((short) 0);
        noteShareRepository.saveAndFlush(noteShare.get());
    }

    @Override
    public void grantEditPermission(NoteShareDTO noteShareDTO) {
        Optional<NoteShare> noteShare = noteShareRepository.findById(noteShareDTO.getShareId());
        if(!noteShare.isPresent()){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("share with shareId {0} does not exists", noteShareDTO.getShareId()));
        }
        noteShare.get().setCanEdit((short) 1);
        noteShareRepository.saveAndFlush(noteShare.get());
    }

    @Override
    public NoteShareDTO getNoteShareInformation(RequestSharedNoteDTO requestSharedNoteDTO) {
        Optional<NoteShare> noteShare = noteShareRepository.findBySharedTo_UserIdAndNote_NoteId(
                requestSharedNoteDTO.getUserId(),
                requestSharedNoteDTO.getNoteId());
        if(!noteShare.isPresent()){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("note share with share Id {0} not found!",
                                    requestSharedNoteDTO.getShareId()));
        }
        if(ShareLengthExpired(noteShare.get())){
            noteShareRepository.deleteById(noteShare.get().getShareId());
            throw new NoteErrorException(
                    MessageFormat
                            .format("note share with share Id {0} date length expired! (it has been deleted)",
                                    requestSharedNoteDTO.getShareId()));
        }
        return noteMapper.noteShareToNoteShareDTO(noteShare.get());
    }

    @Override
    public boolean canAccessSharedNote(UUID shareId) {
        Optional<NoteShare> noteShare = noteShareRepository.findById(shareId);
        if(!noteShare.isPresent()){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("note share with share Id {0} not found!", shareId));
        }
        if(ShareLengthExpired(noteShare.get())){
            noteShareRepository.deleteById(noteShare.get().getShareId());
            return false;
        }
        noteShareRepository.deleteById(noteShare.get().getShareId());
        return true;
    }

    @Override
    public List<NoteShareDTO> getAllSharedNoteInformation(UUID userId) {
        return null;
    }

    private Timestamp createShareLength(int days) {
        long shareLength = 1000 * 60 * 60 * 24 * days;
        return new Timestamp(new Date(shareLength).getTime());
    }

    private Timestamp increaseShareDate(Timestamp originalTimestamp, int days){
        return  Timestamp.valueOf(originalTimestamp.toLocalDateTime()
                .plus(days, ChronoUnit.DAYS));
    }


    private boolean ShareLengthExpired(NoteShare noteShare) {
        Calendar cal = Calendar.getInstance();
        return noteShare.getShareLength().before(cal.getTime());
    }
}
