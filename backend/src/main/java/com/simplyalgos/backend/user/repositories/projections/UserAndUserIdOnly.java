package com.simplyalgos.backend.user.repositories.projections;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface UserAndUserIdOnly {

    @Value("#{target.userId}")
    UUID getUserId();

    @Value("#{target.username}")
    String getUsername();
}
