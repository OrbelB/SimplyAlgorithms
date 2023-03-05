package com.simplyalgos.backend.page.repositories.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface WikiNameAndIdOnly {

    @Value("#{target.wikiId}")
    UUID getWikiId();

    String getWikiName();
}
