package com.simplyalgos.backend.chatty.service;

import com.simplyalgos.backend.chatty.domain.Chatty;
import com.simplyalgos.backend.chatty.dto.ChatRequest;
import com.simplyalgos.backend.chatty.dto.ChatResponse;
import com.simplyalgos.backend.chatty.dto.ChattyDTO;
import com.simplyalgos.backend.chatty.dto.Message;
import com.simplyalgos.backend.chatty.mappers.ChattyMapper;
import com.simplyalgos.backend.chatty.repositories.ChattyRepository;
import com.simplyalgos.backend.comment.dto.CommentDTO;
import com.simplyalgos.backend.comment.services.CommentService;
import com.simplyalgos.backend.page.repositories.ForumRepository;
import com.simplyalgos.backend.page.repositories.projection.ForumChattyInformation;
import com.simplyalgos.backend.page.services.ForumService;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.repositories.projections.UserAndUserIdOnly;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.MessageFormat;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChattyServiceImp implements ChattyService {

    private final ChattyRepository chattyRepository;

    private final ForumRepository forumRepository;

    private final ForumService forumService;

    private final UserRepository userRepository;

    private final CommentService commentService;

    private final ChattyMapper chattyMapper;


    private final String chattyId = "chatty";

    private final String WARNING_MESSAGE = "\n\nThis is an AI generated answer, Chatty's answer may be wrong ";

    @Qualifier("chattyRestTemplate")
    @Autowired
    private RestTemplate restTemplate;

    @Override
    public boolean isAppropriate(String textBody) {
        return false;
    }

    @Override
    public String generateForumResponse(String username, String title, String textBody, Chatty chatty) {
        String input = "Your name is Chatty, answer " + username + "'s forum question " + textBody;
        ChatRequest request = ChatRequest.builder()
                .model(chatty.getModel())
                .messages(List.of(Message.builder().role("user").content(input).build()))
                .n(1)
                .maxTokens(chatty.getMaxInputToken() + 10)
                .temperature(chatty.getTemperature())
                .build();
        ChatResponse openAPIResponse = restTemplate.postForObject(chatty.getApiURL(), request, ChatResponse.class);


        if (openAPIResponse == null || openAPIResponse.getChoices() == null || openAPIResponse.getChoices().isEmpty()) {
            // deal with this
            return "Sorry " + username + " I didnt understand your question :(." +
                    " I would reccomend deleting this post and revising it with a more cleare question";
        }
        // return the first openAPIResponse
        return openAPIResponse.getChoices().get(0).getMessage().getContent();
    }

    @Override
    public void beginChattyForumResponse() {
        // getting chat user information
        UserAndUserIdOnly chatty = userRepository
                .findByUsername(chattyId, UserAndUserIdOnly.class)
                .orElseThrow(() -> new NoSuchElementException("Chatty has not been created"));

        // current chat profile
        Chatty chattyProfile = chattyRepository.
                findById(chattyId)
                .orElseThrow(() -> new NoSuchElementException("chat profile has not been properly set"));

        // chatty is enabled and can answer forum posts
        if (chattyProfile.getProfileEnabled() == 1) {
            if (chattyProfile.getRemainingDelays() == 0) {
                Date yesterday = new Date(System.currentTimeMillis() - 24 * 60 * 60 * 1000);
                log.info(MessageFormat.format("yesterday date is {0}", yesterday));
                Page<ForumChattyInformation> forumPage = forumRepository
                        .findAllByNoActivityAndCreatedDateAfter(
                                true, yesterday,
                                ForumChattyInformation.class,
                                PageRequest.of(0, chattyProfile.getMaxReplies())
                        );
                for (ForumChattyInformation forum : forumPage.getContent()) {
//                List<Forum> forumChattyInformations = forumPage.getContent().stream().toList();
                    // create comment with chat gpt
                    String chattyResponse = generateForumResponse(
                            forum.getCreatedBy().getUsername(),
                            forum.getTitle(), forum.getDescriptionText(),
                            chattyProfile
                    );
                    forumService.updateActivity(forum.getPageId(), false);
                    CommentDTO comment = new CommentDTO(
                            UUID.randomUUID(),
                            forum.getPageId(),
                            chattyResponse + WARNING_MESSAGE,
                            chatty.getUserId()
                    );
                    commentService.createParentComment(comment);
                }
                chattyProfile.setRemainingDelays(chattyProfile.getDelateSetting());
            } else {
                log.debug("+++ chatty remaining delays reduced by one remaining: " + chattyProfile.getRemainingDelays());
                chattyProfile.setRemainingDelays(chattyProfile.getRemainingDelays() - 1);
            }
            chattyRepository.save(chattyProfile);
            log.debug("End of chatty forum response");
        }
    }




//    @Override
//    public ObjectPagedList<?> listChattyProfiles(Pageable pageable) {
//        Page<Chatty> chattyProfiles
//                = chattyRepository.findAll(pageable);
//        return new ObjectPagedList<>(
//                chattyProfiles.stream()
//                        .map(chattyMapper::ChattyToChattyDTO)
//                        .collect(Collectors.toList()),
//                PageRequest.of(
//                        chattyProfiles.getPageable().getPageNumber(),
//                        chattyProfiles.getPageable().getPageSize(),
//                        chattyProfiles.getSort()),
//                chattyProfiles.getTotalElements()
//        );
//    }

    @Override
    public ChattyDTO createProfile(ChattyDTO chattyDTO) {
        chattyRepository.deleteAll();
        return chattyMapper.ChattyToChattyDTO(
                chattyRepository.save(
                        Chatty.builder()
                                .chattyId(chattyId)
                                .chattyDesc(chattyDTO.getChattyDesc())
                                .maxInputToken(chattyDTO.getMaxInputToken())
                                .maxOutputToken(chattyDTO.getMaxOutputToken())
                                .delateSetting(chattyDTO.getDelateSetting())
                                .remainingDelays(chattyDTO.getRemainingDelays())
                                .maxReplies(chattyDTO.getMaxReplies())
                                .profileEnabled(chattyDTO.getProfileEnabled())
                                .model(chattyDTO.getModel())
                                .temperature((chattyDTO.getTemperature() >= 0 && chattyDTO.getTemperature() <= 1)
                                        ? chattyDTO.getTemperature() : 0.7)
                                .apiURL(chattyDTO.getApiURL())
                                .build()
                )
        );
    }

    @Override
    public ChattyDTO updateProfile(ChattyDTO chattyDTO) {
        Optional<Chatty> chatty = chattyRepository.findById(chattyId);

        if (chatty.isPresent()) {
            chatty.get().setChattyDesc(chattyDTO.getChattyDesc());
            chatty.get().setMaxInputToken(chattyDTO.getMaxInputToken());
            chatty.get().setMaxOutputToken(chattyDTO.getMaxOutputToken());
            chatty.get().setDelateSetting(chattyDTO.getDelateSetting());
            chatty.get().setRemainingDelays(chattyDTO.getDelateSetting());
            chatty.get().setMaxReplies(chattyDTO.getMaxReplies());
            chatty.get().setModel(chattyDTO.getModel());
            chatty.get().setApiURL(chattyDTO.getApiURL());
            if (chattyDTO.getTemperature() >= 0 && chattyDTO.getTemperature() <= 1) {
                chatty.get().setTemperature(chattyDTO.getTemperature());
            } else {
                chatty.get().setTemperature(0.7);
            }
            log.debug("updating chatty ");
            return chattyMapper.ChattyToChattyDTO(chattyRepository.saveAndFlush(chatty.get()));
        }
        log.debug("creating a new chatty");
        return createProfile(chattyDTO);

    }

    @Override
    public ChattyDTO getChattyProfile() {
        return chattyMapper.ChattyToChattyDTO(chattyRepository.findById(chattyId).orElseThrow(
                () -> new NoSuchElementException("Chatty profile not found")
        ));
    }

//    @Override
//    public ChattyDTO updateProdile(ChattyDTO chattyDTO) {
//        Optional<Chatty> chatty = chattyRepository.findById(chattyDTO.getChattyId());
//
//        if(chatty.isPresent()){
//            chatty.get().setChattyDesc(chattyDTO.getChattyDesc());
//            chatty.get().setMaxInputToken(chattyDTO.getMaxInputToken());
//            chatty.get().setMaxOutputToken(chattyDTO.getMaxOutputToken());
//            chatty.get().setDelateSetting(chattyDTO.getDelateSetting());
//            chatty.get().setRemainingDelays(chattyDTO.getDelateSetting());
//            chatty.get().setMaxReplies(chattyDTO.getMaxReplies());
//            chatty.get().setModel(chattyDTO.getModel());
//            if(chattyDTO.getTemperature() >= 0 && chattyDTO.getTemperature() <= 1) {
//                chatty.get().setTemperature(chattyDTO.getTemperature());
//            } else {
//                chatty.get().setTemperature(0.7);
//            }
//
//            return chattyMapper.ChattyToChattyDTO(chattyRepository.saveAndFlush(chatty.get()));
//        }
//
//        throw new NoSuchElementException(
//                MessageFormat.format("profile with Id {0} not found ", chattyDTO.getChattyId()));
//    }

//    @Override
//    public boolean deleteProfile(ChattyDTO chattyDTO) {
//        if(!chattyRepository.existsById(chattyDTO.getChattyId())) {
//            throw new NoSuchElementException(
//                    MessageFormat.format("profile with Id {0} not found ", chattyDTO.getChattyId()));
//        }
//        chattyRepository.deleteById(chattyDTO.getChattyId());
//        return true;
//    }

//    @Override
//    public ChattyDTO setMainProfile(ChattyDTO chattyDTO) {
//        Optional<Chatty> newProfile = chattyRepository.findById(chattyDTO.getChattyId());
//        if(!newProfile.isPresent()) {
//            throw new NoSuchElementException(
//                    MessageFormat.format("profile with Id {0} not found ", chattyDTO.getChattyId()));
//        }
//        Optional<Chatty> chatty = chattyRepository.findByProfileEnabled((short) 1);
//        if(!chatty.isPresent()){
//            newProfile.get().setProfileEnabled((short) 1);
//            chattyRepository.save(newProfile.get());
//            return chattyDTO;
//        } else {
//            chatty.get().setProfileEnabled((short) 0);
//            newProfile.get().setProfileEnabled((short) 1);
//            chattyRepository.save(chatty.get());
//            chattyRepository.save(newProfile.get());
//        }
//        return chattyMapper.ChattyToChattyDTO(newProfile.get());
//    }

    @Override
    public String testFunction(UUID forumId, String extra) {
//        generateForumResponse()
        return null;
    }

}
