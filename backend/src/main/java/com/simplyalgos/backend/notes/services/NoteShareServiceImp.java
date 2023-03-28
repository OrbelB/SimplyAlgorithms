package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.exceptions.AlreadySharedNoteWithUserException;
import com.simplyalgos.backend.exceptions.AlreadyUnSharedNoteWithUserException;
import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.exceptions.NoteErrorException;
import com.simplyalgos.backend.notes.domains.NoteShare;
import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.mappers.NoteMapper;
import com.simplyalgos.backend.notes.repositories.NoteShareRepository;
import com.simplyalgos.backend.notes.repositories.UserNoteRepository;
import com.simplyalgos.backend.page.repositories.projection.ForumInformation;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.utils.StringUtils;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import io.swagger.v3.core.util.Json;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.MessageFormat;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class NoteShareServiceImp implements NoteShareService{

    private final NoteMapper noteMapper;
    private final UserService userService;
    private final NoteShareRepository noteShareRepository;
    private final UserNoteRepository userNoteRepository;

    @Override
    public ObjectPagedList<?> listSharedTooUsers(UUID noteId, Pageable pageable) {
        Page<NoteShare> noteShares = noteShareRepository.findAllByNote_NoteId(noteId, pageable);
        return new ObjectPagedList<>(
                noteShares.stream()
                        .map(noteMapper::noteShareToNoteShareDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        noteShares.getPageable().getPageNumber(),
                        noteShares.getPageable().getPageSize(),
                        noteShares.getSort()),
                noteShares.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> listSharedNotes(UUID userId, Pageable pageable) {
        Page<NoteShare> noteShares = noteShareRepository.findAllBySharedTo_UserId(userId, pageable);
        return new ObjectPagedList<>(
                noteShares.stream()
                        .map(noteMapper::noteShareToFullShareNoteDTO)

                        .collect(Collectors.toList()),
                PageRequest.of(
                        noteShares.getPageable().getPageNumber(),
                        noteShares.getPageable().getPageSize(),
                        noteShares.getSort()),
                noteShares.getTotalElements()
        );
    }

    //    will check if note is public.
//    cannot share public notes
    @Override
    public NoteShareDTO shareNoteToUser(FullShareNoteDTO fullShareNoteDTO) {
        log.debug(Json.pretty(fullShareNoteDTO));
        if(!StringUtils.isNotNullAndEmptyOrBlank(fullShareNoteDTO.getNoteShareDTO().getShareToUserName())){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("username field must be filled received: {0}",fullShareNoteDTO
                                    .getNoteShareDTO().getShareToUserName()));
        }
        User shareTo = userService.getUserByUsername(fullShareNoteDTO.getNoteShareDTO().getShareToUserName());
        Optional<UserNotes> userNote = userNoteRepository.findById((fullShareNoteDTO.getUserNoteDTO().getNoteId()));
        if(!userNote.isPresent()){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("Note with note Id {0} not found", fullShareNoteDTO
                                    .getUserNoteDTO().getNoteId()));
        }
        if(userNote.get().getIsPublic() == 1){
            throw new NoteErrorException(
                    MessageFormat
                            .format("Note with note Id {0} is public and can not be shared", fullShareNoteDTO
                                    .getUserNoteDTO().getNoteId()));
        }
        if(noteShareRepository.existsBySharedTo_UserIdAndNote_NoteId(shareTo.getUserId(), userNote.get()
                .getNoteId())){
            throw new AlreadySharedNoteWithUserException(MessageFormat
                    .format("Already shared Note with user {0}", fullShareNoteDTO
                            .getNoteShareDTO().getShareToUserName()));
        }
        if(shareTo.getUserId() == userNote.get().getCreatedBy().getUserId()){
            throw new NoteErrorException(MessageFormat
                    .format("Cannot share note to self Check userName user {0}", fullShareNoteDTO
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
        if(!noteShareRepository.existsById(noteShareDTO.getShareId())){
            throw new AlreadyUnSharedNoteWithUserException(
                    MessageFormat
                            .format("ERROR UNSHARING: noteShare info not found", noteShareDTO.getShareToUserName()));
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

//    @Override
//    public boolean removeEditPermission(UUID shareId) {
//        Optional<NoteShare> noteShare = noteShareRepository.findById(shareId);
//        if(!noteShare.isPresent()){
//            throw new ElementNotFoundException(
//                    MessageFormat
//                            .format("share with shareId {0} does not exists", shareId));
//        }
//        noteShare.get().setCanEdit((short) 0);
//        noteShareRepository.saveAndFlush(noteShare.get());
//        return true;
//    }

    @Override
    public boolean updateEditPermission(UUID shareId) {
        Optional<NoteShare> noteShare = noteShareRepository.findById(shareId);
        if(!noteShare.isPresent()){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("share with shareId {0} does not exists", shareId));
        }
        if(noteShare.get().getCanEdit() == 1){
            noteShare.get().setCanEdit((short) 0);
        }else{
            noteShare.get().setCanEdit((short) 1);
        }
        noteShareRepository.saveAndFlush(noteShare.get());
        return true;
    }

    @Override
    public NoteShareDTO getNoteShareInformation(UUID shareId) {
        Optional<NoteShare> noteShare = noteShareRepository.findById(shareId);
        if(!noteShare.isPresent()){
            throw new ElementNotFoundException(
                    MessageFormat
                            .format("note share with share Id {0} not found!",
                                    shareId));
        }
        if(ShareLengthExpired(noteShare.get())){
            noteShareRepository.deleteById(noteShare.get().getShareId());
            throw new NoteErrorException(
                    MessageFormat
                            .format("note share with share Id {0} date length expired! (it has been deleted)",
                                    shareId));
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
        return true;
    }

    @Override
    public UUID getNoteID(UUID shareId) {
        NoteShare noteShare =  noteShareRepository.findById(shareId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("share with Id {0} not found", shareId)));
        return noteShare.getNote().getNoteId();
    }

//    @Override
//    public List<NoteShareDTO> getAllSharedNoteInformation(UUID userId) {
//        return null;
//    }

    private Timestamp createShareLength(int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_YEAR, days);
        Date expirationDate = calendar.getTime();
        return new Timestamp(expirationDate.getTime());
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
