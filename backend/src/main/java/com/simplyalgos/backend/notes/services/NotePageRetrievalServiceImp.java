package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class NotePageRetrievalServiceImp implements NotePageRetrievalService{

    @Override
    public ObjectPagedList<?> ListUserNotes(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> listUserNotesByLastUpdated(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> listUserNotesByOldest(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> listUserNotesByNewest(Pageable pageable) {
        return null;
    }

//    ----


    @Override
    public ObjectPagedList<?> listSharedNotes(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> listSharedNotesWithEditGranted(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> listNewestSharedNote(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> listOldestSharedNote(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> listShareNoteByEarliestExpireDate(Pageable pageable) {
        return null;
    }

//    ----

    @Override
    public ObjectPagedList<?> listPublicNotes(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> listPublicNotesByNewestShareDate(Pageable pageable) {
        return null;
    }

    @Override
    public ObjectPagedList<?> listPublicNotesByOldestShareDate(Pageable pageable) {
        return null;
    }
}
