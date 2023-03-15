package com.simplyalgos.backend.notes.dtos;

import com.simplyalgos.backend.user.dtos.UserDataDTO;
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
public class UserNoteDTO {
    UUID noteId;
    String noteTitle;
    //cannot set / update from front end
    Timestamp createdDate;
    //cannot set / update from front end
    Timestamp lastUpdated;
    short isPublic;
    String noteBody;

    UserDataDTO createdBy;

//    if the owner of the note unshared, deletes, or share length expires
//    then sharedTo user will receive a message.
    String errorSharedNoteMessage;
    boolean hasError;

}
