package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.domains.NoteShare;
import com.simplyalgos.backend.notes.domains.PublicNotes;
import com.simplyalgos.backend.notes.domains.UserNotes;
import com.simplyalgos.backend.notes.dtos.PublicNoteDTO;
import com.simplyalgos.backend.notes.mappers.NoteMapper;
import com.simplyalgos.backend.notes.repositories.NoteShareRepository;
import com.simplyalgos.backend.notes.repositories.PublicNoteRepository;
import com.simplyalgos.backend.notes.repositories.UserNoteRepository;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import io.swagger.v3.core.util.Json;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class PublicNotesServiceImp implements PublicNotesService{

    private final PublicNoteRepository publicNoteRepository;
    private final NoteShareRepository noteShareRepository;

    private final UserNoteRepository userNoteRepository;
    private final NoteMapper noteMapper;

    @Override
    public ObjectPagedList<?> listPublicNotes(Pageable pageable) {
        Page<PublicNotes> publicNotesPage = publicNoteRepository.findAll(pageable);
        return new ObjectPagedList<>(
                publicNotesPage.stream()
                        .map(noteMapper::publicNoteToPublicNoteDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        publicNotesPage.getPageable().getPageNumber(),
                        publicNotesPage.getPageable().getPageSize(),
                        publicNotesPage.getSort()),
                publicNotesPage.getTotalElements()
        );
    }

    //    insert into the table public_note
//    if the note was previously shared it will be unshared
    @Override
    public PublicNoteDTO makeNotePublic(PublicNoteDTO publicNoteDTO, UserNotes userNotes) {
        if(noteShareRepository.existsByNote_NoteId(publicNoteDTO
                .getUserNoteDTO().getNoteId())){
            log.debug("NOTE IS SHARED NOW UNSHARING");
            noteShareRepository.deleteAllByNote_NoteId(userNotes.getNoteId());
            log.debug("UNSHARED THE NOTE WITH USERS TO MAKE IT PUBLIC");
        }
        PublicNotes publicNotes = publicNoteRepository.saveAndFlush(
                PublicNotes.builder()
                        .publicNote(userNotes)
                        .description(publicNoteDTO.getDescription())
                        .build()
        );
        return noteMapper.publicNoteToPublicNoteDTO(publicNotes);
    }

    //    will delete the tuple
    @Override
    public void makeNotePrivateUsingPublicShareId(UUID publicShareId) {
        if(!publicNoteRepository.existsById(publicShareId)){
            throw new NoSuchElementException(
                    MessageFormat.format("public Note with publicShareId {0} note found", publicShareId));
        }
        publicNoteRepository.deleteById(publicShareId);
    }
    @Override
    public void makeNotePrivateUsingNoteId(UUID noteId) {
        if(!publicNoteRepository.existsByPublicNote_NoteId(noteId)){
            throw new NoSuchElementException(
                    MessageFormat.format("public Note with noteId {0} note found",noteId));
        }
        publicNoteRepository.deleteByPublicNote_NoteId(noteId);
    }

//    can update the share note description
    @Override
    public PublicNoteDTO updatePublicNoteDescriptionUsingPublicShareId(PublicNoteDTO publicNoteDTO) {
        Optional<PublicNotes> publicNotes = publicNoteRepository.findById(publicNoteDTO.getPublicShareId());
        if(!publicNotes.isPresent()){
            throw new NoSuchElementException(
                    MessageFormat.format("note with public share Id {0} not found",
                            publicNoteDTO.getPublicShareId()));
        }
        publicNotes.get().setDescription(publicNoteDTO.getDescription());
        publicNoteRepository.saveAndFlush(publicNotes.get());
        return noteMapper.publicNoteToPublicNoteDTO(publicNotes.get());
    }

    @Override
    public PublicNoteDTO updatePublicNoteDescriptionUsingNoteId(PublicNoteDTO publicNoteDTO) {
//        log.debug("INSIDE UPDATE" + Json.pretty(publicNoteDTO));
        Optional<PublicNotes> publicNotes = publicNoteRepository.findByPublicNote_NoteId (publicNoteDTO
                .getUserNoteDTO().getNoteId());
        if(!publicNotes.isPresent()){
            throw new NoSuchElementException(
                    MessageFormat.format("note with Note id {0} not found",
                            publicNoteDTO.getUserNoteDTO().getNoteId()));
        }
        publicNotes.get().setDescription(publicNoteDTO.getDescription());
        publicNoteRepository.saveAndFlush(publicNotes.get());
        return noteMapper.publicNoteToPublicNoteDTO(publicNotes.get());
    }

    @Override
    public PublicNoteDTO getPublicNoteInformationUsingPublicShareId(UUID publicShareId) {
        return noteMapper.publicNoteToPublicNoteDTO(publicNoteRepository.findById(publicShareId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("Public Note with publicShareId {0} note found",
                        publicShareId))
                ));
    }

    @Override
    public PublicNoteDTO getPublicNoteDTOUsingNoteId(UUID noteId) {
        return noteMapper.publicNoteToPublicNoteDTO(publicNoteRepository.findByPublicNote_NoteId(noteId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("Public Note with noteId {0} note found",
                        noteId))
        ));
    }

    @Override
    public PublicNotes getPublicNoteUsingNoteId(UUID noteId) {
        return publicNoteRepository.findByPublicNote_NoteId(noteId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("getPublicNoteUsingNoteId Public Note with noteId {0} note found",
                        noteId)));
    }
}
