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

//    THE PRIMARY KEY
    UUID shareId;

    //person it is being shared too
    String shareToUserName; //the username
    UUID shareToUserId; //the userId

    // cannot set / update from front end
    Timestamp shareDate;
    // CAN set / update from front end /
    // if left empty then will result to default 15 days
    Timestamp expireDate;

    boolean canEdit = false;
//  ------------------------------------------------------ //
// NEED TO PUT THIS IN

    int numberOfDaysToShare = 15;
}
