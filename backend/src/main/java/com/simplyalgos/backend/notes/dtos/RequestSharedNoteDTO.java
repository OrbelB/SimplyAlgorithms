package com.simplyalgos.backend.notes.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder

//call this to request a specific sharedNote
public class RequestSharedNoteDTO {
    UUID shareId;
    UUID userId;
    UUID noteId;
}
