package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.dtos.NoteShareDTO;
import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class NoteShareServiceImp implements NoteShareService{
    @Override
    public NoteShareDTO shareNoteToUser(NoteShareDTO noteShareDTO) {
        return null;
    }

    @Override
    public NoteShareDTO unShareNote(NoteShareDTO noteShareDTO) {
        return null;
    }

    @Override
    public NoteShareDTO updateShareStatus(NoteShareDTO noteShareDTO) {
        return null;
    }

    @Override
    public boolean removeEditPermission(NoteShareDTO noteShareDTO) {
        return false;
    }

    @Override
    public boolean grantEditPermission(NoteShareDTO noteShareDTO) {
        return false;
    }

    @Override
    public NoteShareDTO getNoteShareInformation(UUID userId, UUID noteId) {
        return null;
    }

    @Override
    public List<NoteShareDTO> getAllSharedNoteInformation(UUID userId) {
        return null;
    }
}
