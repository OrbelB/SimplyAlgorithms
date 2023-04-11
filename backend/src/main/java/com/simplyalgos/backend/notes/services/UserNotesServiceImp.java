package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.exceptions.NoteErrorException;
import com.simplyalgos.backend.exceptions.UserNotAuthorizedException;
import com.simplyalgos.backend.exceptions.UserNoteIsAlreadyPrivateException;
import com.simplyalgos.backend.exceptions.UserNoteIsAlreadyPublicException;
import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import com.simplyalgos.backend.notes.mappers.NoteMapper;
import com.simplyalgos.backend.notes.repositories.UserNoteRepository;
import com.simplyalgos.backend.user.mappers.UserMapper;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.MessageFormat;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class UserNotesServiceImp implements UserNotesService {

    private final NoteShareService noteShareService;
    private final PublicNotesService publicNotesService;
    private final UserNoteRepository userNoteRepository;

    private final UserService userService;
    private final UserMapper userMapper;
    private final NoteMapper noteMapper;

    @Override
    public ObjectPagedList<UserNoteDTO> listUserNotesByTitle(UUID userId, String title, Pageable pageable) {

        Page<UserNotes> userNotesPage = userNoteRepository
                .findAllByCreatedBy_UserIdAndTitleStartingWith(userId, title, pageable, UserNotes.class);
        return new ObjectPagedList<>(
                userNotesPage.stream()
                        .map(noteMapper::userNotesToUserNoteDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        userNotesPage.getPageable().getPageNumber(),
                        userNotesPage.getPageable().getPageSize(),
                        userNotesPage.getSort()),
                userNotesPage.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> listUserNotes(UUID userId, Pageable pageable) {
        Page<UserNotes> userNotesPage = userNoteRepository.findAllByCreatedBy_UserId(userId, pageable);
        return new ObjectPagedList<>(
                userNotesPage.stream()
                        .map(noteMapper::userNotesToUserNoteDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        userNotesPage.getPageable().getPageNumber(),
                        userNotesPage.getPageable().getPageSize(),
                        userNotesPage.getSort()),
                userNotesPage.getTotalElements()
        );
    }


    //    Implemented && note tested
//    This not will never be allowed to be public,
    @Override
    public UserNoteDTO savePublicNote(UUID userId, UUID noteId) {
        UserNotes userNotes = getUserNotes(noteId);

        // limit the size title to 250 characters
        String title = userNotes.getTitle().length() > 60 ?
                userNotes.getTitle().substring(0, 40).concat("...") + userNotes.getCreatedBy().getUsername()  :
                userNotes.getTitle() + userNotes.getCreatedBy().getUsername();
        log.info("title of the note is " + title);
        return noteMapper.userNotesToUserNoteDTO(userNoteRepository.saveAndFlush(
                UserNotes.builder()
                        .title((title.toCharArray().length >= 190 ) ? title.substring(0, 150) : title)
                        .createdDate(userNotes.getCreatedDate())
                        .lastUpdated(userNotes.getLastUpdated())
                        .isPublic((short) 0)
                        .noteBody(userNotes.getNoteBody())
                        .createdBy(userService.getUser(userId))
                        .build()
        ));
    }

    //    Implimented
//    Note tested
    @Override
    public UserNoteDTO createNotePage(UserNoteDTO userNoteDTO) {
        log.debug("In creatingNotePage");
        Timestamp currentTimeStamp = new Timestamp(new Date().getTime());
        UserNotes userNotes = userNoteRepository.saveAndFlush(
                UserNotes.builder()
                        .createdBy(userMapper.userDataDTOToUser(userNoteDTO.getCreatedBy()))
                        .noteBody(userNoteDTO.getNoteBody())
                        .title(userNoteDTO.getTitle())
                        .isPublic((short) 0)
                        .createdDate(currentTimeStamp)
                        .lastUpdated(currentTimeStamp)
                        .build()
        );
        log.debug("End of creatingNotePage");
        log.debug("note with NoteId " + userNotes.getNoteId() + " created");
        return noteMapper.userNotesToUserNoteDTO(userNotes);
    }


    //    This function will not make note public or private or deal with the sharing functionality
    @Override
    public UserNoteDTO updateUserNote(UserNoteDTO userNoteDTO) {
        UserNotes userNotes = userNoteRepository.findById(userNoteDTO.getNoteId())
                .orElseThrow(
                        () -> new NoSuchElementException(
                                MessageFormat.format("note with Id {0} not found ", userNoteDTO.getNoteId())
                        ));
        Timestamp currentTimeStamp = new Timestamp(new Date().getTime());
        userNotes.setNoteBody(userNoteDTO.getNoteBody());
        userNotes.setTitle(userNoteDTO.getTitle());
        userNotes.setLastUpdated(currentTimeStamp);
        userNoteRepository.saveAndFlush(userNotes);
        return noteMapper.userNotesToUserNoteDTO(userNotes);
    }

    @Override
    public FullShareNoteDTO updateSharedUserNote(FullShareNoteDTO fullShareNoteDTO) {
        Optional<UserNotes> OriginalUserNotes = userNoteRepository.findById(fullShareNoteDTO.getUserNoteDTO().getNoteId());
        if (!OriginalUserNotes.isPresent()) {
            throw new NoSuchElementException(MessageFormat.format("User Note ith noteId {0} does not exists"
                    , fullShareNoteDTO.getUserNoteDTO().getNoteId()));
        }
        NoteShareDTO noteShareDTO = noteShareService.getNoteShareInformation(fullShareNoteDTO.getNoteShareDTO().getShareId());

        if (!noteShareDTO.isCanEdit()) {
            throw new UserNotAuthorizedException(MessageFormat
                    .format("Share Info with share Id {0} does not have permission to update the note " +
                                    "please contact the owner of the note "
                            , noteShareDTO.getShareToUserId()));
        }
//        if true then this will delete the tuple from share note table
        if (!noteShareService.canAccessSharedNote(noteShareDTO.getShareId())) {
            throw new UserNotAuthorizedException(MessageFormat
                    .format("share info with share Id {0} has expired "
                            , noteShareDTO.getShareToUserId()));
        }

        OriginalUserNotes.get().setNoteBody(fullShareNoteDTO.getUserNoteDTO().getNoteBody());
        OriginalUserNotes.get().setTitle(fullShareNoteDTO.getUserNoteDTO().getTitle());


        userNoteRepository.saveAndFlush(
                OriginalUserNotes.get()
        );

        return FullShareNoteDTO.builder()
                .userNoteDTO(updateUserNote(fullShareNoteDTO.getUserNoteDTO()))
                .noteShareDTO(noteShareDTO)
                .build();
    }

    @Override
    public UUID deleteNotePage(UUID noteId) {
        if (!userNoteRepository.existsById(noteId)) {
            throw new NoSuchElementException(
                    MessageFormat.format("note with Id {0} not found ", noteId));
        }
        userNoteRepository.deleteById(noteId);
        return noteId;
    }

    @Override
    public UserNoteDTO getUserNoteDTO(UUID noteId) {
        return noteMapper.userNotesToUserNoteDTO(userNoteRepository.findById(noteId).orElseThrow(() ->
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
        if (!noteShareService.canAccessSharedNote(shareId)) {
            throw new NoteErrorException(MessageFormat.format("share note with Id {0} cannot be accecced", shareId));
        }
        if (!noteId.equals(noteShareService.getNoteID(shareId))) {
            throw new NoteErrorException(MessageFormat.format("Wrong NoteId {0} passed in", noteId));
        }
        Optional<UserNotes> userNotesOptional =
                userNoteRepository.findById(noteId);
        if (!userNotesOptional.isPresent()) {
            throw new NoSuchElementException(
                    MessageFormat.format("note with Id {0} not found ", noteId));
        }
        if (!noteShareService.canAccessSharedNote(shareId)) {
            noteShareService.unShareNote(shareId);
            throw new UserNotAuthorizedException(MessageFormat
                    .format("share info with share Id {0} has expired "
                            , noteId));
        }

        return FullShareNoteDTO.builder()
                .noteShareDTO(noteShareService
                        .getNoteShareInformation(shareId))
                .userNoteDTO(noteMapper
                        .userNotesToUserNoteDTO(userNotesOptional.get()))
                .build();
    }

    @Override
    public UserNotes makeNotePublic(UUID noteId) {
        UserNotes userNotes = userNoteRepository
                .findById(noteId).orElseThrow(() ->
                        new NoSuchElementException(
                                MessageFormat.format("note with Id {0} not found", noteId)));
        if (userNotes.getIsPublic() == 1) {
            throw new UserNoteIsAlreadyPublicException(
                    MessageFormat.format("note with Id {0} is already public", noteId));
        }
        userNotes.setIsPublic((short) 1);

        return userNoteRepository.saveAndFlush(userNotes);
    }

    @Override
    public UserNoteDTO makeNotePrivate(UUID noteId) {
        UserNotes userNotesOptional = userNoteRepository
                .findById(noteId).orElseThrow(() ->
                        new NoSuchElementException(
                                MessageFormat.format("note with Id {0} not found", noteId)));
        if (userNotesOptional.getIsPublic() == 0) {
            throw new UserNoteIsAlreadyPrivateException(
                    MessageFormat.format("note with Id {0} is already private", noteId));
        }
        userNotesOptional.setIsPublic((short) 0);
        return noteMapper.userNotesToUserNoteDTO(userNoteRepository.saveAndFlush(userNotesOptional));
    }

}
