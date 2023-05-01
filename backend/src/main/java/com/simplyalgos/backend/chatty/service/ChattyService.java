package com.simplyalgos.backend.chatty.service;

import com.simplyalgos.backend.chatty.dto.chattyDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface ChattyService {

    boolean isAppropriate(String textBody);

    String generateForumResponse(String username, String title, String textBody);

//    this will be called in the scheduler to find empty forum post to answer.
    void beginChattyForumResponse();

    ObjectPagedList<?> listChattyProfiles(Pageable pageable);

    chattyDTO createProfile(chattyDTO chattyDTO);

    chattyDTO updateProdile(chattyDTO chattyDTO);

    boolean deleteProfile(chattyDTO chattyDTO);

    chattyDTO setMainProfile(chattyDTO chattyDTO);

    String testFunction(UUID forumId, String extra);


}
