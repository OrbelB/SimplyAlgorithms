package com.simplyalgos.backend.user.dtos;

import java.util.UUID;

public record UserIdAndUsername(

            UUID userId,
            String username
)  {
}
