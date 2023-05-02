package com.simplyalgos.backend.chatty.service;

import com.simplyalgos.backend.chatty.domain.Chatty;
import com.simplyalgos.backend.chatty.dto.ChattyDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ChattyService {

    boolean isAppropriate(String textBody);

    String generateForumResponse(String username, String title, String textBody, Chatty chatty);

//    this will be called in the scheduler to find empty forum post to answer.
    void beginChattyForumResponse();

//    ObjectPagedList<?> listChattyProfiles(Pageable pageable);

    ChattyDTO createProfile(ChattyDTO chattyDTO);

    ChattyDTO updateProfile(ChattyDTO chattyDTO);

    ChattyDTO getChattyProfile();

//    boolean deleteProfile(ChattyDTO chattyDTO);

//    ChattyDTO setMainProfile(ChattyDTO chattyDTO);

    String testFunction(UUID forumId, String extra);


}
