package com.simplyalgos.backend.notes.dtos;

import com.simplyalgos.backend.user.dtos.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FullShareNoteDTO {
    NoteShareDTO noteShareDTO;
    UserNoteDTO userNoteDTO;
}
