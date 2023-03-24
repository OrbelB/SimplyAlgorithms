package com.simplyalgos.backend.page.repositories.projection;

import org.springframework.beans.factory.annotation.Value;

import java.util.Set;
import java.util.UUID;

public interface WikiInformation {

    @Value("#{target.wikiId}")
    UUID getWikiId();

    @Value("#{target.wikiName}")
    String getWikiName();

    @Value("#{target.wikiTopicPages}")
    Set<TopicPageLink> getLinks();




}
