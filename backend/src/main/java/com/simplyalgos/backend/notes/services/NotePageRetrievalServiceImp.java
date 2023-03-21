package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.domains.NoteShare;
import com.simplyalgos.backend.notes.domains.PublicNotes;
import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.repositories.NoteShareRepository;
import com.simplyalgos.backend.notes.repositories.PublicNoteRepository;
import com.simplyalgos.backend.notes.repositories.UserNoteRepository;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class NotePageRetrievalServiceImp implements NotePageRetrievalService{

    private final UserNoteRepository userNoteRepository;
    private final NoteShareRepository noteShareRepository;
    private final PublicNoteRepository publicNoteRepository;


    @Override
    public ObjectPagedList<?> ListUserNotes(Pageable pageable) {
        Page<UserNotes> userNotes = userNoteRepository.findAll(pageable);
        return new ObjectPagedList<>(
         userNotes.stream()
                 .collect(Collectors.toList()),
                PageRequest.of(
                        userNotes.getPageable().getPageNumber(),
                        userNotes.getPageable().getPageSize(),
                        userNotes.getSort()),
                userNotes.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> listUserNotesByLastUpdated(Pageable pageable) {
        Page<UserNotes> userNotes = userNoteRepository.findAllByLastUpdated(pageable);
        return new ObjectPagedList<>(
                userNotes.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        userNotes.getPageable().getPageNumber(),
                        userNotes.getPageable().getPageSize(),
                        userNotes.getSort()),
                userNotes.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> listUserNotesByCreatedDate(Pageable pageable) {
        Page<UserNotes> userNotes = userNoteRepository.findAllByCreatedDate(pageable);
        return new ObjectPagedList<>(
                userNotes.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        userNotes.getPageable().getPageNumber(),
                        userNotes.getPageable().getPageSize(),
                        userNotes.getSort()),
                userNotes.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> ListUserNotesByIsPublic(Pageable pageable, short isPublic) {
        Page<UserNotes> userNotes = userNoteRepository.findAllByIsPublic(pageable, isPublic);
        return new ObjectPagedList<>(
                userNotes.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        userNotes.getPageable().getPageNumber(),
                        userNotes.getPageable().getPageSize(),
                        userNotes.getSort()),
                userNotes.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> ListUserNotesByIsSharedToOtherUsers(Pageable pageable) {
        Page<UserNotes> userNotes = userNoteRepository.findAllBySharedToExists(pageable);
        return new ObjectPagedList<>(
                userNotes.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        userNotes.getPageable().getPageNumber(),
                        userNotes.getPageable().getPageSize(),
                        userNotes.getSort()),
                userNotes.getTotalElements()
        );
    }

//    ---- NOTE SHARE

    @Override
    public ObjectPagedList<?> listSharedNotes(Pageable pageable) {
        Page<NoteShare> noteShares = noteShareRepository.findAll(pageable);
        return new ObjectPagedList<>(
                noteShares.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        noteShares.getPageable().getPageNumber(),
                        noteShares.getPageable().getPageSize(),
                        noteShares.getSort()),
                noteShares.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> listSharedNotesWithEditGranted(Pageable pageable, short canEdit) {
        Page<NoteShare> noteShares = noteShareRepository.findAllByCanEdit(pageable, canEdit);
        return new ObjectPagedList<>(
                noteShares.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        noteShares.getPageable().getPageNumber(),
                        noteShares.getPageable().getPageSize(),
                        noteShares.getSort()),
                noteShares.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> listShareNoteByExpireDateDesc(Pageable pageable) {
        Page<NoteShare> noteShares = noteShareRepository.findAllByOrderByShareLengthDesc(pageable);
        return new ObjectPagedList<>(
                noteShares.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        noteShares.getPageable().getPageNumber(),
                        noteShares.getPageable().getPageSize()),
                noteShares.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> listShareNoteByExpireDateAcs(Pageable pageable) {
        Page<NoteShare> noteShares = noteShareRepository.findAllByOrderByShareLengthAsc(pageable);
        return new ObjectPagedList<>(
                noteShares.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        noteShares.getPageable().getPageNumber(),
                        noteShares.getPageable().getPageSize()),
                noteShares.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> listShareNoteByShareDateDesc(Pageable pageable) {
        Page<NoteShare> noteShares = noteShareRepository.findAllByOrderByShareDateDesc(pageable);
        return new ObjectPagedList<>(
                noteShares.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        noteShares.getPageable().getPageNumber(),
                        noteShares.getPageable().getPageSize()),
                noteShares.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> listShareNoteByShareDateAcs(Pageable pageable) {
        Page<NoteShare> noteShares = noteShareRepository.findAllByOrderByShareDateAsc(pageable);
        return new ObjectPagedList<>(
                noteShares.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        noteShares.getPageable().getPageNumber(),
                        noteShares.getPageable().getPageSize()),
                noteShares.getTotalElements()
        );
    }

//    ---- PUBLIC NOTES

    @Override
    public ObjectPagedList<?> listPublicNotes(Pageable pageable) {
        Page<PublicNotes> publicNotes = publicNoteRepository.findAll(pageable);
        return new ObjectPagedList<>(
                publicNotes.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        publicNotes.getPageable().getPageNumber(),
                        publicNotes.getPageable().getPageSize(),
                        publicNotes.getSort()),
                publicNotes.getTotalElements()
        );
    }
}

