package com.simplyalgos.backend.tag.repositories.projections;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface TagInfoOnly {

    @Value("#{target.tagId}")
    UUID getTagId();

    @Value("#{target.tag}")
    String getTag();
}
