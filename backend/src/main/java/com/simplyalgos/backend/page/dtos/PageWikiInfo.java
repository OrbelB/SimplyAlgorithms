package com.simplyalgos.backend.page.dtos;

import jakarta.persistence.Column;

import java.util.UUID;

public record PageWikiInfo(


        String title,


        @Column(name = "page_id")
        UUID pageId
) {
}
