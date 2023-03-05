package com.simplyalgos.backend.page.repositories.projection;

import org.springframework.beans.factory.annotation.Value;


public interface WikiTopicPageWikiOnly {

    @Value("#{target.wikiChild}")
    WikiNameAndIdOnly getWikiChild();
}
