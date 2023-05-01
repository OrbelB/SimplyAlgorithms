package com.simplyalgos.backend.chatty.service;

import com.simplyalgos.backend.chatty.domain.Chatty;
import com.simplyalgos.backend.chatty.dto.chattyDTO;
import com.simplyalgos.backend.chatty.repositories.ChattyRepository;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChattyServiceImp implements ChattyService{

    private ChattyRepository chattyRepository;

    @Override
    public boolean isAppropriate(String textBody) {
        return false;
    }

    @Override
    public String generateForumResponse(String username, String title, String textBody) {
        return null;
    }

    @Override
    public void beginChattyForumResponse() {

    }

    @Override
    public ObjectPagedList<?> listChattyProfiles(Pageable pageable) {
        return null;
    }

    @Override
    public chattyDTO createProfile(chattyDTO chattyDTO) {
        return null;
    }

    @Override
    public chattyDTO updateProdile(chattyDTO chattyDTO) {
        return null;
    }

    @Override
    public boolean deleteProfile(chattyDTO chattyDTO) {
        if(!chattyRepository.existsById(chattyDTO.getChattyId())) {
            throw new NoSuchElementException(
                    MessageFormat.format("profile with Id {0} not found ", chattyDTO.getChattyId()));
        }
        chattyRepository.deleteById(chattyDTO.getChattyId());
        return true;
    }

    @Override
    public chattyDTO setMainProfile(chattyDTO chattyDTO) {
        Optional<Chatty> newProfile = chattyRepository.findById(chattyDTO.getChattyId());
        if(!newProfile.isPresent()) {
            throw new NoSuchElementException(
                    MessageFormat.format("profile with Id {0} not found ", chattyDTO.getChattyId()));
        }
        Optional<Chatty> chatty = chattyRepository.findByProfileEnabled((short) 1);
        if(!chatty.isPresent()){
            newProfile.get().setProfileEnabled((short) 1);
            chattyRepository.save(newProfile.get());
            return chattyDTO;
        } else {
            chatty.get().setProfileEnabled((short) 0);
            newProfile.get().setProfileEnabled((short) 1);
            chattyRepository.save(chatty.get());
            chattyRepository.save(newProfile.get());
        }
        return chattyDTO;
    }

    @Override
    public String testFunction(UUID forumId, String extra) {
        return null;
    }
}
