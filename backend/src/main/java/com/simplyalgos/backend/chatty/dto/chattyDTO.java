package com.simplyalgos.backend.chatty.dto;


import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class chattyDTO {

    private UUID chattyId;
    private String chattyDesc;
    private int maxInputToken;
    private int maxOutputToken;
    private int delateSetting;
    private int remainingDelays;
    int maxReplies;
    private short profileEnabled;
    private String model;
    private double temperature;
}

