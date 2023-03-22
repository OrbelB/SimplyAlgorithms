package com.simplyalgos.backend.notes.controllers;

import com.simplyalgos.backend.notes.dtos.FullShareNoteDTO;
import com.simplyalgos.backend.notes.dtos.PublicNoteDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import com.simplyalgos.backend.notes.security.*;
import com.simplyalgos.backend.notes.services.NoteShareService;
import com.simplyalgos.backend.notes.services.PublicNotesService;
import com.simplyalgos.backend.notes.services.UserNotesService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@CrossOrigin(methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("note")
@Slf4j
@RestController
public class NoteController {

    private final UserNotesService userNotesService;
    private final NoteShareService noteShareService;
    private final PublicNotesService publicNotesService;

    //for each tab

    //get personal notes
    @NotePermission
    @GetMapping(path = "/UserNotes" , consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> getUserNote(@RequestParam(name = "userId") @NotNull UUID userId,
                                         @RequestParam(name = "noteId") @NotNull UUID noteId){
        return ResponseEntity.ok(userNotesService.getUserNoteDTO(noteId));
    }

    //get public notes
    @GetMapping(path = "/publicNotes" , consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> getPublicNote(@RequestParam(name = "noteId") @NotNull UUID noteId){
        return ResponseEntity.ok(userNotesService.getPublicNoteUserNote(noteId));
    }

    //get public notes
    @NotePermission
    @GetMapping(path = "/ShareNotePage" , consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> getSharedNote(@RequestParam(name = "userId") @NotNull UUID userId,
                                           @RequestParam(name = "noteId") @NotNull UUID noteId,
                                           @RequestParam(name = "shareId") @NotNull UUID shareId){
        return ResponseEntity.ok(userNotesService.getSharedNote(shareId, noteId));
    }

//    list userNotes
//    list user notes by last updated
//    lust user notes by created date
//    list user note by is public
//    list shared notes --> notes that have been shared

//    list shared notes --> list the notes the user has access to
//    list shared notes with specific permission
//    list the closest expire date
//    list furthest expire date
//    list the closest share date
//    list the furthest share date
//    list public notes


    //Create note
    @CreateNotePermission
    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<?> createUserNote(@RequestBody UserNoteDTO userNoteDTO){
        log.debug("Now creating the user Note");
        return ResponseEntity.status(HttpStatus.CREATED).body(userNotesService.createNotePage(userNoteDTO));
    }

    //update note --> updates the json & other necessary items.
    @UpdateNotePermission
    @PutMapping(path = "/update", consumes = "application/json")
    public ResponseEntity<?> updateUserNotes(@RequestBody UserNoteDTO userNoteDTO){
        log.debug("updating personal user notes");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(userNotesService.updateUserNote(userNoteDTO));
    }

    //update shared note --> the user who has a note shared to them update the note
    @UpdateSharedNotePermission
    @PutMapping(path = "/update_share_note", consumes = "application/json")
    public ResponseEntity<?> updateSharedUserNotes(@RequestBody FullShareNoteDTO fullShareNoteDTO){
        log.debug("updating personal user notes");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(userNotesService.updateSharedUserNote(fullShareNoteDTO));
    }


    //delete note --> delete the specified note
    @NotePermission
    @DeleteMapping(path = "/delete", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> deleteNote(@RequestParam(name = "userId") @NotNull UUID userId,
                                        @RequestParam(name = "noteId") @NotNull UUID noteId){
        return ResponseEntity.ok().body(userNotesService.deleteNotePage(noteId));
    }



    //share Note
    @ShareNotePermission
    @PostMapping(path = "/shareNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> shareNote(@RequestBody FullShareNoteDTO fullShareNoteDTO){
        log.debug("Sharing note");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(noteShareService.shareNoteToUser(fullShareNoteDTO));
    }

    //unshare Note
    @ShareNotePermission
    @PostMapping(path = "/UnShareNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> unShareNote(@RequestBody FullShareNoteDTO fullShareNoteDTO){
        log.debug("Sharing note");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(noteShareService.unShareNote(fullShareNoteDTO.getNoteShareDTO()));
    }

    //update shared Note --> called when the shared note is updated by the receiver
    @UpdateSharedNotePermission
    @PutMapping(path = "/updateShareNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateSharedUserNote(@RequestBody FullShareNoteDTO fullShareNoteDTO){
        log.debug("updating shared note");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(userNotesService.updateSharedUserNote(fullShareNoteDTO));
    }

    //update permission --> toggle if user can edit the notebook or not

    @NotePermission
    @PostMapping(path = "/grantEditPermission", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> grantEditPermission(@RequestParam(name = "userId") @NotNull UUID userId,
                                        @RequestParam(name = "shareId") @NotNull UUID shareId,
                                        @RequestParam(name = "permission") @NotNull boolean permission){
        if(permission){
            return ResponseEntity.status((HttpStatus.ACCEPTED)).body(noteShareService.grantEditPermission(shareId));
        }
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(noteShareService.removeEditPermission(shareId));
    }

    //update share length
    @ShareNotePermission
    @PutMapping(path = "/updateExpireDate", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateExpireDateOnSharedNotes(@RequestBody FullShareNoteDTO fullShareNoteDTO){
        log.debug("updatibng the expire date");
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(noteShareService.updateExpireDate(fullShareNoteDTO.getNoteShareDTO()));
    }

    //update public note description
    @PublicNotePermission
    @PutMapping(path = "/updatePublicNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updatePublicNote(@RequestBody PublicNoteDTO publicNoteDTO){
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(publicNotesService
                .updatePublicNoteDescriptionUsingNoteId(publicNoteDTO));
    }


    //Publish Note to user base
    @PublicNotePermission
    @PostMapping(path = "/publicizeNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> makeNotePublic(@RequestBody PublicNoteDTO publicNoteDTO){
        userNotesService.makeNotePublic(publicNoteDTO.getUserNoteDTO().getNoteId());
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(publicNotesService.makeNotePublic(publicNoteDTO));
    }

    //private public note
    @PublicNotePermission
    @DeleteMapping(path = "/privateNote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> makeNotePrivate(@RequestBody PublicNoteDTO publicNoteDTO){
        publicNotesService
                .makeNotePrivateUsingPublicShareId(publicNoteDTO.getPublicShareId());
        return ResponseEntity.status((HttpStatus.ACCEPTED)).body(userNotesService
                .makeNotePrivate(publicNoteDTO.getUserNoteDTO().getNoteId()));
    }

    //    will notify user of the action
//    admin make note private
//    admin delete public note
    @PublicNotePermission
    @DeleteMapping(path = "/deletePublicNoteAdmin", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> deletePublicNoteByAdmin(@RequestBody PublicNoteDTO publicNoteDTO){
        publicNotesService.makeNotePrivateUsingPublicShareId(publicNoteDTO.getPublicShareId());
        return ResponseEntity.status((HttpStatus.ACCEPTED))
                .body(userNotesService.deleteNotePage(publicNoteDTO.getUserNoteDTO().getNoteId()));
    }

}
