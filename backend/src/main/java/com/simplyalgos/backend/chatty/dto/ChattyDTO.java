package com.simplyalgos.backend.chatty.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChattyDTO {
        String chattyId;
        String chattyDesc;
        int maxInputToken;
        int maxOutputToken;
        int delateSetting;
        int remainingDelays;
        int maxReplies;
        short profileEnabled;
        String model;
        double temperature;
        String apiURL;
}
