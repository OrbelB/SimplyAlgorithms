package com.simplyalgos.backend.page.repositories.projection;

import jakarta.persistence.Column;

import java.util.UUID;

public interface TopicNameAndIDOnly {
    @Column(name = "page_id")
    UUID getPageId();
    @Column(name = "title")
    String getTitle();
}
