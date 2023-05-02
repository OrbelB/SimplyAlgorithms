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
public class ChatRequest {
    String model;
    List<Message> messages;
    int n;

    @JsonProperty("max_tokens")
    int maxTokens;
    double temperature;
}
