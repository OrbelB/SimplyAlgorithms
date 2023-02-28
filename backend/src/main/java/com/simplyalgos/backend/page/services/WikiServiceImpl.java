package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.page.domains.Wiki;
import com.simplyalgos.backend.page.domains.WikiTopicPage;
import com.simplyalgos.backend.page.dtos.PageBasicInfo;
import com.simplyalgos.backend.page.dtos.WikiDTO;
import com.simplyalgos.backend.page.mappers.TopicMapper;
import com.simplyalgos.backend.page.mappers.WikiMapper;
import com.simplyalgos.backend.page.repositories.WikiRepository;
import com.simplyalgos.backend.page.repositories.WikiTopicPageRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class WikiServiceImpl implements WikiService {

    private final WikiRepository wikiRepository;

    private final TopicService topicService;

    private final WikiMapper wikiMapper;

    private final TopicMapper topicMapper;

    private final WikiTopicPageRepository wikiTopicPageRepository;

    @Override
    public Set<Wiki> getWikiMainCategories() {
        return new HashSet<>(wikiRepository.findAll());
    }

    @Override
    public UUID saveWikiMainCategory(WikiDTO wiki) {
        Wiki newWiki = wikiMapper.wikiDTOToWiki(wiki);
        // TODO check to see if it is already part of the wiki
        wiki.pageIds().forEach(pageId -> {
            newWiki.getWikiTopicPages()
                    .add(WikiTopicPage.builder().topicPage(topicService.getTopic(pageId)).wikiCategory(newWiki).build()); //TEST
        });
        return wikiRepository.save(newWiki).getWikiId();
    }

    @Override
    public Set<PageBasicInfo> getWikiTopics(UUID wikiId) {
        Set<WikiTopicPage> wikiTopicPages = wikiTopicPageRepository.getWikiTopicPageByWikiTopicPageId_WikiId(wikiId);
        return wikiTopicPages.stream()
                .map(WikiTopicPage::getTopicPage)
                .map(topicMapper::pageToPageBasicInfo)
                .collect(Collectors.toSet());
    }
}
