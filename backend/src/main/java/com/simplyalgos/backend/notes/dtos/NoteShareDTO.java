package com.simplyalgos.backend.notes.dtos;

import com.simplyalgos.backend.user.dtos.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class NoteShareDTO {

    //person it is being shared too
    UUID shareId;
    // cannot set / update from front end
    Timestamp shareDate;
    // CAN set / update from front end
    Timestamp shareLength;
    boolean canEdit;
    //includes UserDataDTO in UserNoteDTO
    UserNoteDTO userNoteDTO;

//    if the owner of the note unshared, deletes, or share length expires
//    then sharedTo user will receive a message.
    String errorSharedNoteMessage;
    boolean hasError;
}
