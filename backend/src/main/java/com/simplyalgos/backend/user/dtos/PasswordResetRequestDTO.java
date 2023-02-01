package com.simplyalgos.backend.user.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PasswordResetRequestDTO {
    public String username;
//    public UUID token;
//    public Data expireDate;


}
