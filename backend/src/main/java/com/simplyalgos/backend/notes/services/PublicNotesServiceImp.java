package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.dtos.PublicNoteDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class PublicNotesServiceImp implements PublicNotesService{
    @Override
    public PublicNoteDTO makeNotePublic(PublicNoteDTO publicNoteDTO) {
        return null;
    }

    @Override
    public PublicNoteDTO updatePublicNoteDescription(PublicNoteDTO publicNoteDTO) {
        return null;
    }

    @Override
    public PublicNoteDTO getPublicNoteInformation(UUID noteId) {
        return null;
    }

    @Override
    public boolean unpublicizeNote(UUID noteId) {
        return false;
    }
}
