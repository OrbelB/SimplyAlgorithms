package com.simplyalgos.backend.notes.services;

import com.simplyalgos.backend.notes.dtos.UserNoteDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface UserNotesService {

    UUID createNotePage(UserNoteDTO userNoteDTO);

    UserNoteDTO updateUserNote(UserNoteDTO userNoteDTO);

    void deleteNotePage(UUID noteId);

    UserNoteDTO getUserNote(UUID noteId);
    UserNoteDTO getSharedNote(UUID noteId);
    UserNoteDTO getPublicNote(UUID noteId);


//    will return UserListDTO
    ObjectPagedList<?> ListPersonalNotes(Pageable pageable);

//    Will return FullSharedNoteDTO
    ObjectPagedList<?> ListSharedNotes(Pageable pageable);

//    Will return FullPublicNoteDTO
    ObjectPagedList<?> ListPublicNotes(Pageable pageable);

    List<UserNoteDTO> getSpecificNotes(List<UUID> noteIdList);

    //  will update the is_public column on sql
    boolean makeNotePublic(UUID noteId);
    boolean makeNotePrivate(UUID noteId);

//    for admins to delete public notes that are not needed.
    void adminDeletePublicNote(UUID noteId);

    void adminMakePublicNotePrivate(UUID noteId);
}
