package com.simplyalgos.backend.notes.services;

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
public class UserNotesServiceImp implements UserNotesService{
    @Override
    public UUID createNotePage(UserNoteDTO userNoteDTO) {
        return null;
    }

    @Override
    public UserNoteDTO updateUserNote(UserNoteDTO userNoteDTO) {
        return null;
    }

    @Override
    public void deleteNotePage(UUID noteId) {

    }

    @Override
    public UserNoteDTO getUserNote(UUID noteId) {
        return null;
    }

    @Override
    public UserNoteDTO getSharedNote(UUID noteId) {
        return null;
    }

    @Override
    public UserNoteDTO getPublicNote(UUID noteId) {
        return null;
    }

    @Override
    public ObjectPagedList<?> ListPersonalNotes(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> ListSharedNotes(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> ListPublicNotes(Pageable pageable) {
        return null;
    }

    @Override
    public List<UserNoteDTO> getSpecificNotes(List<UUID> noteIdList) {
        return null;
    }

    @Override
    public boolean makeNotePublic(UUID noteId) {
        return true;
    }

    @Override
    public boolean makeNotePrivate(UUID noteId) {
        return false;
    }

    @Override
    public void adminDeletePublicNote(UUID noteId) {

    }

    @Override
    public void adminMakePublicNotePrivate(UUID noteId) {

    }
}
