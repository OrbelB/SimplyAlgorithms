package com.simplyalgos.backend.notes.controllers;

import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.dtos.PublicNoteDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import com.simplyalgos.backend.notes.security.*;
import com.simplyalgos.backend.notes.services.NoteShareService;
import com.simplyalgos.backend.notes.services.PublicNotesService;
import com.simplyalgos.backend.notes.services.UserNotesService;
import com.simplyalgos.backend.utils.StringUtils;
import io.swagger.v3.core.util.Json;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@CrossOrigin(methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.HEAD,
        RequestMethod.PATCH, RequestMethod.TRACE}, origins = "*", allowedHeaders = "*", maxAge = 3600)
@RequestMapping("note")
@Slf4j
@RestController
public class NoteController {

    private final UserNotesService userNotesService;
    private final NoteShareService noteShareService;
    private final PublicNotesService publicNotesService;

//    GET MAPPINGS

    //  Hit this too see who YOU HAVE SHARED TOO
//    @NotePermission
//    TESTED ANS PASSED
    @GetMapping(path = "/listSharedToo", produces = "application/json")
    public ResponseEntity<?> listSharedToo(@RequestParam(name = "userId") @NotNull UUID userId,
                                           @RequestParam(name = "noteId") @NotNull UUID noteId,
                                           @RequestParam(name = "page", defaultValue = "0") Integer page,
                                           @RequestParam(name = "size", defaultValue = "5") Integer size,
                                           @RequestParam(name = "sortBy", defaultValue = "shareLength", required = false) String sortBy) {

        log.debug("INSIDE THE FUNCTION");
        if (sortBy.equals("shareLength") || sortBy.equals("shareDate")) {
            return ResponseEntity.ok(noteShareService
                    .listSharedTooUsers(noteId, PageRequest.of(page, size, Sort.by(sortBy).descending())));
        }
        return ResponseEntity.ok(noteShareService
                .listSharedTooUsers(noteId, PageRequest.of(page, size, Sort.by(sortBy))));
    }

    //    hit too see the notes people have shared TOO YOU
//    @NotePermission
//    TESTED AND PASSED
    @GetMapping(path = "/listSharedNotes", produces = "application/json")
    public ResponseEntity<?> listSharedNotes(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                             @RequestParam(name = "size", defaultValue = "5") Integer size,
                                             @RequestParam(name = "sortBy", defaultValue = "shareLength") String sortBy,
                                             @RequestParam(name = "userId") @NotNull UUID userId,
                                             @RequestParam(name = "title", required = false) String title) {

        if(StringUtils.isNotNullAndEmptyOrBlank(title)){
            return ResponseEntity.ok(noteShareService
                    .listSharedNotesByTitle(userId, title, PageRequest.of(page, size)));
        }
        log.debug("INSIDE THE FUNCTION");
        if (sortBy.equals("shareLength") || sortBy.equals("shareDate")) {
            return ResponseEntity.ok(noteShareService
                    .listSharedNotes(userId, PageRequest.of(page, size, Sort.by(sortBy).descending())));
        }
        if (Objects.equals(sortBy, "title")) {
            return ResponseEntity.ok(noteShareService
                    .listSharedNotes(userId, PageRequest.of(page, size, Sort.by("note.".concat(sortBy)).ascending())));
        }
        if (Objects.equals(sortBy, "createdDate")) {
            return ResponseEntity.ok(noteShareService
                    .listSharedNotes(userId, PageRequest.of(page, size, Sort.by("note.".concat(sortBy)).descending())));
        }
        return ResponseEntity.ok(noteShareService
                .listSharedNotes(userId, PageRequest.of(page, size)));

    }

    //    TESTED AND PASSED
//    @NotePermission
    @GetMapping(path = "/listPublicNotes", produces = "application/json")
    public ResponseEntity<?> listPublicNotes(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                             @RequestParam(name = "size", defaultValue = "5") Integer size,
                                             @RequestParam(name = "sortBy", defaultValue = "publicNote") String sortBy,
                                             @RequestParam(name = "userId") @NotNull UUID userId,
                                             @RequestParam(name = "title", required = false) String title) {

        if (StringUtils.isNotNullAndEmptyOrBlank(title)) {
            return ResponseEntity.ok(publicNotesService
                    .listPublicNotesByTitle(title, PageRequest.of(page, size)));
        }
        if (Objects.equals(sortBy, "createdDate")) {
            return ResponseEntity.ok(publicNotesService
                    .listPublicNotes(PageRequest.of(page, size, Sort.by("publicNote.".concat(sortBy)).descending())));
        }
        if(Objects.equals(sortBy, "title")){
            return ResponseEntity.ok(publicNotesService
                    .listPublicNotes(PageRequest.of(page, size, Sort.by("publicNote.".concat(sortBy)).ascending())));
        }
        return ResponseEntity.ok(publicNotesService.listPublicNotes(PageRequest.of(page, size, Sort.by(sortBy))));
    }

    //    TESTED AND FINISHED
//    @NotePermission
    @GetMapping("/listUserNotes")
    public ResponseEntity<?> getUserNotes(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                          @RequestParam(name = "size", defaultValue = "5") Integer size,
                                          @RequestParam(name = "sortBy", defaultValue = "lastUpdated") String sortBy,
                                          @RequestParam(name = "userId") UUID userID,
                                          @RequestParam(name = "title", required = false) String title) {
        if(StringUtils.isNotNullAndEmptyOrBlank(title)){
            return ResponseEntity.ok(userNotesService.listUserNotesByTitle(userID, title,
                    PageRequest.of(page, size)));
        }
        if (sortBy.equals("lastUpdated") || sortBy.equals("createdDate")) {
            return ResponseEntity.ok(userNotesService.listUserNotes(userID,
                    PageRequest.of(page, size, Sort.by(sortBy).descending())));
        }
        return ResponseEntity.ok(userNotesService.listUserNotes(userID,
                PageRequest.of(page, size, Sort.by(sortBy))));
    }

//    END OF LISTS

    //  GET MAPPING
//    TESTED AND PASSED
    @GetMapping(path = "/getPublicNotes", produces = "application/json")
    public ResponseEntity<?> getPublicNote(@RequestParam(name = "noteId") @NotNull UUID noteId) {
        return ResponseEntity.ok(publicNotesService.getPublicNoteDTOUsingNoteId(noteId));
    }

    //    TESTED AND PASSED
//    Made it so only the correct notes can be accesed
    @NotePermission
    @GetMapping(path = "/getShareNotePage", produces = "application/json")
    public ResponseEntity<?> getSharedNote(@RequestParam(name = "userId") @NotNull UUID userId,
                                           @RequestParam(name = "noteId") @NotNull UUID noteId,
                                           @RequestParam(name = "shareId") @NotNull UUID shareId) {
        return ResponseEntity.ok(userNotesService.getSharedNote(shareId, noteId));
    }


    //    check that the person requesting has the same userID
//    TESTED PASSED
    @NotePermission
    @GetMapping(path = "/UserNotes", produces = "application/json")
    public ResponseEntity<?> getUserNote(@RequestParam(name = "userId", required = false) UUID userId,
                                         @RequestParam(name = "noteId") @NotNull UUID noteId) {
        log.debug("Getting user note with userId: " + userId + " for noteId " + noteId);
        return ResponseEntity.ok(userNotesService.getUserNoteDTO(noteId));
    }


    //--------------------------------//

//    POST MAPPINGS

    //    PASSED AND TEST
    //Create note
    @CreateNotePermission
    @PostMapping(path = "/create", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createUserNote(@RequestBody UserNoteDTO userNoteDTO) {
        log.debug("Now creating the user Note");
        log.debug(Json.pretty(userNoteDTO));
        return ResponseEntity.status(HttpStatus.CREATED).body(userNotesService.createNotePage(userNoteDTO));
    }


    //  will create a new UserNote
//    TESTED AND PASSED
    @NotePermission
    @PostMapping(path = "/savePublicNote", produces = "application/json")
    public ResponseEntity<?> savePublicNote(@RequestParam(name = "userId") @NotNull UUID userId,
                                            @RequestParam(name = "noteId") @NotNull UUID noteId) {
        return ResponseEntity.ok(userNotesService.savePublicNote(userId, noteId));
    }


    //Publish Note to user base
//    TESTED AND PASSED
    @PublicNotePermission
    @PostMapping(path = "/publicizeNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> makeNotePublic(@RequestBody PublicNoteDTO publicNoteDTO) {
        UserNotes userNotes = userNotesService.makeNotePublic(publicNoteDTO.getUserNoteDTO().getNoteId());
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(publicNotesService.makeNotePublic(publicNoteDTO, userNotes));
    }


    //share Note will create a new entry in note_share
//    TESTED AND PASSED
//    @ShareNotePermission
    @PostMapping(path = "/shareNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> shareNote(@RequestBody FullShareNoteDTO fullShareNoteDTO) {
        log.debug("Sharing note");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(noteShareService.shareNoteToUser(fullShareNoteDTO));
    }

//    ---------------------------------------- //
//  PUT MAPPING


    //update UserNotes --> updates the json & other necessary items.
//    TESTED AND PASSED
    @UpdateNotePermission
    @PutMapping(path = "/update", consumes = "application/json")
    public ResponseEntity<?> updateUserNotes(@RequestBody UserNoteDTO userNoteDTO) {
        log.debug("updating personal user notes");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(userNotesService.updateUserNote(userNoteDTO));
    }

    //update shared Note --> called when the shared note is updated by the receiver
//    TESTED AND PASSED
    @PutMapping(path = "/updateShareNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateSharedUserNote(@RequestBody FullShareNoteDTO fullShareNoteDTO) {
        log.debug("updating shared note");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(userNotesService.updateSharedUserNote(fullShareNoteDTO));
    }

    //update permission --> toggle if user can edit the notebook or not
//    TESTED AND PASSED
    @NotePermission
    @PutMapping(path = "/updateEditPermission", produces = "application/json")
    public ResponseEntity<?> updateEditPermission(@RequestParam(name = "userId") UUID userId,
                                                  @RequestParam(name = "shareId") UUID shareId) {
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(noteShareService.updateEditPermission(shareId));
    }

    //update share length
//    TESTED AND PASSED
//    Can pass in a negative for numberOfDaysToShare to reduce the number of days to share
//    Pass a positive value for numberOfDaysToShare to extend the number of days to share
//    @ShareNotePermission
    @PutMapping(path = "/updateExpireDate", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateExpireDateOnSharedNotes(@RequestBody NoteShareDTO noteShareDTO) {
        log.debug("updating the expire date");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(noteShareService.updateExpireDate(noteShareDTO));
    }

    //update public note description
//    TESTED AND PASSED
    @PublicNotePermission
    @PutMapping(path = "/updatePublicNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updatePublicNote(@RequestBody PublicNoteDTO publicNoteDTO) {
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(publicNotesService
                .updatePublicNoteDescriptionUsingNoteId(publicNoteDTO));
    }

//    ------------------------------------------------ //
//    DELETE MAPPING

    //private public note
//  TESTED AND PASSED
    @PublicNotePermission
    @PutMapping(path = "/privateNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> makeNotePrivate(@RequestBody PublicNoteDTO publicNoteDTO) {
        log.info("Making note private" + publicNoteDTO.getUserNoteDTO().getNoteId());
        publicNotesService
                .makeNotePrivateUsingNoteId(publicNoteDTO.getUserNoteDTO().getNoteId());
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(userNotesService
                .makeNotePrivate(publicNoteDTO.getUserNoteDTO().getNoteId()));
    }

    //    will notify user of the action
//    admin make note private
//    admin delete public note
//    TESTED AND PASSED
    @AdminNotePermission
    @DeleteMapping(path = "/deletePublicNoteAdmin", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> deletePublicNoteByAdmin(@RequestBody PublicNoteDTO publicNoteDTO) {
        return ResponseEntity.status((HttpStatus.ACCEPTED))
                .body(userNotesService.
                        deleteNotePage(publicNoteDTO.getUserNoteDTO().getNoteId()));
    }

    //delete note --> delete the specified note
//    TESTED AND PASSED
    @NotePermission
    @DeleteMapping(path = "/delete", produces = "application/json")
    public ResponseEntity<?> deleteNote(@RequestParam(name = "userId") @NotNull UUID userId,
                                        @RequestParam(name = "noteId") @NotNull UUID noteId) {
        return ResponseEntity.ok().body(userNotesService.deleteNotePage(noteId));
    }


    //unshare Note
//    TESTED AND PASSED
//    @ShareNotePermission
    @DeleteMapping(path = "/UnShareNote", produces = "application/json")
    public ResponseEntity<?> unShareNote(@RequestParam(name = "shareId") UUID shareId,
                                         @RequestParam(name = "userId", required = false) UUID userId) {
        log.debug("UN Sharing note");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(noteShareService.unShareNote(shareId));
    }

}
