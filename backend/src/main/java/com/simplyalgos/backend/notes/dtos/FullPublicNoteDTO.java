package com.simplyalgos.backend.notes.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FullPublicNoteDTO {
    PublicNoteDTO publicNoteDTO;
    UserNoteDTO userNoteDTO;
}
