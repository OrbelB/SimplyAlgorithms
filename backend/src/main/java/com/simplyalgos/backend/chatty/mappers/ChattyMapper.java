package com.simplyalgos.backend.chatty.mappers;

import com.simplyalgos.backend.chatty.domain.Chatty;
import com.simplyalgos.backend.chatty.dto.ChattyDTO;
import org.mapstruct.Mapper;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface ChattyMapper {

    Chatty chattyDTOToChatty(ChattyDTO chattyDTO);

    ChattyDTO ChattyToChattyDTO(Chatty Chatty);
}
