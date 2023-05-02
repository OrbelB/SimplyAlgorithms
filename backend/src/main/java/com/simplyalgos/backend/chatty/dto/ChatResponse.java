package com.simplyalgos.backend.chatty.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChatResponse {
    private List<Choice> choices;

    // constructors, getters and setters

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Choice {

        private int index;
        private Message message;
    }
}
