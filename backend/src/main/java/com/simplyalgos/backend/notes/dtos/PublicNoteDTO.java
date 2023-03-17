package com.simplyalgos.backend.notes.dtos;

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
public class PublicNoteDTO {

    UUID publicShareId;
    String description = "This is a public note shared by an admin or teacher";
    // cannot set / update from front end
    Timestamp shareDate;
    UserNoteDTO userNoteDTO;

}
