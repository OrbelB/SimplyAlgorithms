package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.domains.Wiki;
import com.simplyalgos.backend.page.domains.WikiParentChild;
import com.simplyalgos.backend.page.domains.WikiTopicPage;
import com.simplyalgos.backend.page.domains.ids.WikiParentChildId;
import com.simplyalgos.backend.page.domains.ids.WikiTopicPageId;
import com.simplyalgos.backend.page.dtos.PageWikiInfo;
import com.simplyalgos.backend.page.dtos.WikiDTO;
import com.simplyalgos.backend.page.dtos.WikiInfo;
import com.simplyalgos.backend.page.mappers.WikiMapper;
import com.simplyalgos.backend.page.repositories.WikiParentChildRepository;
import com.simplyalgos.backend.page.repositories.WikiRepository;
import com.simplyalgos.backend.page.repositories.WikiTopicPageRepository;
import com.simplyalgos.backend.page.repositories.projection.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Objects;
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

    private final WikiParentChildRepository wikiParentChildRepository;

    private final WikiTopicPageRepository wikiTopicPageRepository;

    @Override
    public Set<WikiInformation> getWikiMainCategories() {
        return wikiRepository.findAllByIsParentChild("child", WikiInformation.class);
    }


    /**
     * This method will get the sub categories information which includes wikiName and wikiId
     *
     * @return the wiki sub category information (wikiName and wikiId) as a set of WikiNameAndIdOnly
     */
    @Override
    public Set<?> getSubCategories() {
        return wikiRepository.findAllByIsParentChild("child", WikiNameAndIdOnly.class);
    }


    /**
     * This method will update the wiki information and remove the children wikis that are not in the previous list
     * as well as the topic pages that are not in the previous list
     *
     * @param wiki the wiki information that will be updated
     * @return the wikiName that was updated in the database
     */
    @Override
    public String updateWiki(WikiDTO wiki) {
        Wiki wikiToUpdate = wikiRepository.findById(wiki.getWikiId())
                .orElseThrow(() -> new ElementNotFoundException("Wiki not found"));
        wikiToUpdate.setWikiName(wiki.getWikiName());
        wikiToUpdate.setDescription(wiki.getDescription());
        if (Objects.equals(wikiToUpdate.getIsParentChild(), "parent")) {
            log.debug("Updating children wikis from a parent");
            updateChildrenWikis(wiki.getWikiIds(), wikiToUpdate);
        } else if (Objects.equals(wikiToUpdate.getIsParentChild(), "child")) {
            updateTopicPages(wiki.getPageIds(), wikiToUpdate);
        }
        return wikiRepository.save(wikiToUpdate).getWikiName();
    }

    /**
     * This method will get the wiki information by the name
     *
     * @param wikiName the name of the wiki
     * @return the wiki information that was found: includes the children wikis and the topic pages
     * @throws ElementNotFoundException if the wiki is not found
     */
    @Override
    public Wiki getWiki(String wikiName) {
        return wikiRepository.getWikiByWikiName(wikiName).orElseThrow(ElementNotFoundException::new);
    }

    @Override
    public Set<WikiInfo> getAllWikiSubCategoriesBasicInfo() {
        return wikiRepository.findAllByIsParentChild("child", WikiInfo.class);
    }


    /**
     * This method handles updating the children wikis for a parent wiki
     *
     * @param wikiIds      the list of children wikis to add / keep
     * @param wikiToUpdate the wiki parent to update information
     * @throws ElementNotFoundException if the wiki is not found
     */
    private void updateChildrenWikis(Set<UUID> wikiIds, Wiki wikiToUpdate) {
        wikiIds.forEach((id) -> {
            // if it does not exist add it
            if (!wikiParentChildRepository.existsById(WikiParentChildId.builder()
                    .wikiParentId(wikiToUpdate.getWikiId())
                    .wikiChildId(id)
                    .build())) {
                wikiToUpdate.addWikiChild(WikiParentChild.builder()
                        .wikiParent(wikiToUpdate)
                        .wikiChild(getWiki(id))
                        .wikiParentChildId(WikiParentChildId.builder()
                                .wikiParentId(wikiToUpdate.getWikiId())
                                .wikiChildId(id)
                                .build())
                        .build());
            }
        });


        wikiParentChildRepository.deleteByWikiParentChildIdNotInAndWikiParent(
                wikiIds.stream()
                        .map(wikiId -> WikiParentChildId.builder()
                                .wikiParentId(wikiToUpdate.getWikiId())
                                .wikiChildId(wikiId)
                                .build())
                        .collect(Collectors.toSet()), wikiToUpdate);
    }


    /**
     * This method will update the wiki topic pages to keep/ add / remove
     *
     * @param pageIds    the list of topic pages to add / keep
     * @param updateWiki the wiki to update information
     * @throws ElementNotFoundException if the wiki is not found
     */
    private void updateTopicPages(Set<UUID> pageIds, Wiki updateWiki) {
        pageIds.forEach((id) -> {
            // if it does not exist add it
            if (!wikiTopicPageRepository.existsById(WikiTopicPageId.builder()
                    .wikiId(updateWiki.getWikiId())
                    .pageId(id)
                    .build())) {
                Topic topic = topicService.getTopic(id);
                topic.setUrlPath(updateWiki.getWikiName() + "/" + topic.getTitle());
                updateWiki.addWikiTopicPage(WikiTopicPage.builder()
                        .wikiCategory(updateWiki)
                        .topicPage(topic)
                        .wikiTopicPageId(WikiTopicPageId.builder()
                                .wikiId(updateWiki.getWikiId())
                                .pageId(id)
                                .build())
                        .build());
            }
        });

        // remove the ones that are not in the list
        wikiTopicPageRepository.deleteByWikiTopicPageIdNotInAndWikiCategory(pageIds.stream()
                .map(pageId -> WikiTopicPageId.builder()
                        .wikiId(updateWiki.getWikiId())
                        .pageId(pageId)
                        .build()
                ).collect(Collectors.toSet()), updateWiki);
    }

    /**
     * This method is used to save a new wiki main category
     *
     * @param wiki the wiki object to be saved
     * @return the id of the saved wiki
     */
    @Override
    public String saveWiki(WikiDTO wiki) {
        Wiki newWiki = wikiMapper.wikiDTOToWiki(wiki);
        if (wiki.getPageIds() != null && wiki.getPageIds().size() > 0) {
            // map the pages to the wiki
            newWiki.setWikiTopicPages(wiki.getPageIds().stream()
                    .map(topicService::getTopic)
                    .map(topic -> {
                        topic.setUrlPath(wiki.getWikiName() + "/" + topic.getUrlPath());
                        return WikiTopicPage.builder()
                                .wikiCategory(newWiki)
                                .topicPage(topic)
                                .wikiTopicPageId(WikiTopicPageId.builder()
                                        .wikiId(newWiki.getWikiId())
                                        .pageId(topic.getPageId())
                                        .build())
                                .build();
                    })
                    .collect(Collectors.toSet())
            );
            newWiki.setIsParentChild("child");
        } else if (wiki.getWikiIds() != null && wiki.getWikiIds().size() > 0) {
            // map the sub categories or sub wikis to the wiki
            newWiki.setWikiChildren(wiki.getWikiIds().stream()
                    .map(wikiRepository::getReferenceById)
                    .map(wikiChild -> WikiParentChild.builder()
                            .wikiParent(newWiki)
                            .wikiChild(wikiChild)
                            .wikiParentChildId(WikiParentChildId.builder()
                                    .wikiParentId(newWiki.getWikiId())
                                    .wikiChildId(wikiChild.getWikiId())
                                    .build()).build())
                    .collect(Collectors.toSet()));
            newWiki.setIsParentChild("parent");
        } else {
            newWiki.setIsParentChild("child");
        }
        return wikiRepository.save(newWiki).getWikiName();
    }


    /**
     * This method is used to get the basic info of all the wikis that are not part of another wiki
     *
     * @return Set of WikiInfo objects includes the wiki name and id
     */
    @Override
    public Set<WikiInfo> getAvailableWikis() {
        Set<UUID> wikiIds = wikiParentChildRepository.findAllWikiTopicPageWikiOnlyProjectedBy().stream()
                .map(WikiTopicPageWikiOnly::getWikiChild)
                .map(WikiNameAndIdOnly::getWikiId)
                .collect(Collectors.toSet());
        if (wikiIds.isEmpty()) wikiIds.add(UUID.fromString("00000000-0000-0000-0000-000000000000"));

        return wikiRepository.findAllByWikiIdNotIn(wikiIds, WikiInfo.class);
    }

    @Override
    public Set<WikiTopicPage> getWikiTopics(UUID wikiId) {
        return wikiTopicPageRepository.getWikiTopicPageByWikiTopicPageId_WikiId(wikiId);
    }

    /**
     * This method is used to get the basic info of all the topics in the wiki that are available
     *
     * @return Set of PageWikiInfo
     */
    @Override
    public Set<PageWikiInfo> getWikiTopicsBasicInfo() {
        Set<UUID> pageIds = wikiTopicPageRepository.findAllProjectedBy().stream()
                .map(WikiTopicPageOnly::getTopicPage)
                .map(TopicNameAndIDOnly::getPageId)
                .collect(Collectors.toSet());
        // to ensure it finds at least one page in the event that there are no pages in the wiki
        if (pageIds.isEmpty()) {
            pageIds.add(UUID.fromString("c0a80101-0000-0000-0000-000000000000"));
        }
        return topicService.getWikiInfo(
                pageIds
        );
    }

    @Override
    public boolean isWikiNameAvailable(String name) {
        return !wikiRepository.existsByWikiName(name.trim());
    }


    /**
     * This method is used to delete a wiki by id
     *
     * @param wikiId the id used to delete object
     * @return the id of the deleted wiki
     */
    @Override
    public UUID deleteWiki(UUID wikiId) {
        if (wikiRepository.existsById(wikiId)) {
            wikiRepository.deleteById(wikiId);
            return wikiId;
        }
        throw new ElementNotFoundException("Wiki with id " + wikiId + " does not exist");
    }

    /**
     * This method is used to get a wiki by id
     *
     * @param wikiId the id used to get object
     * @return the wiki object
     */
    @Override
    public Wiki getWiki(UUID wikiId) {
        return wikiRepository.findById(wikiId)
                .orElseThrow(() ->
                        new ElementNotFoundException("Wiki with id " + wikiId + " does not exist")
                );
    }


}
