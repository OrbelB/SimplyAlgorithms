package com.simplyalgos.backend.chatty.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ChatRequest {
    String title;
    String textBody;
    String userName;
}
