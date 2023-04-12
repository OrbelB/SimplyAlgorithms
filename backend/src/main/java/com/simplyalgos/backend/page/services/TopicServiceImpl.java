package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.page.domains.CodeSnippet;
import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.domains.TopicExternalResource;
import com.simplyalgos.backend.page.domains.WikiTopicPage;
import com.simplyalgos.backend.page.domains.ids.CodeSnippetId;
import com.simplyalgos.backend.page.domains.ids.PageVoteId;
import com.simplyalgos.backend.page.domains.ids.TopicExternalResourceId;
import com.simplyalgos.backend.page.domains.ids.WikiTopicPageId;
import com.simplyalgos.backend.page.dtos.*;
import com.simplyalgos.backend.page.mappers.TopicMapper;
import com.simplyalgos.backend.page.repositories.*;
import com.simplyalgos.backend.page.repositories.projection.TopicInformation;
import com.simplyalgos.backend.page.repositories.projection.TopicNameAndIDOnly;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.report.services.PageReportService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.utils.StringUtils;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Transactional
@Service
public class TopicServiceImpl implements TopicService {
    private final WikiTopicPageRepository wikiTopicPageRepository;
    private final WikiRepository wikiRepository;
    private final PageVoteService pageVoteService;

    private final TopicRepository topicRepository;

    private final TopicMapper topicMapper;

    private final PageEntityService pageEntityService;

    private final PageReportService pageReportService;

    private final CodeSnippetRepository codeSnippetRepository;

    private final UserService userService;

    private final TopicExternalResourceRepository topicExternalResourceRepository;

    @Override
    public Topic getTopic(UUID topicId) {
        return topicRepository.findById(topicId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("Element not found for id {0}", topicId))
        );
    }

    @Override
    public ObjectPagedList<?> listTopicPages(Pageable pageable) {
        Page<Topic> topicPage = topicRepository.findAll(pageable);
        return new ObjectPagedList<>(
                topicPage
                        .stream()
                        .map(topicMapper::topicToFullTopicDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(topicPage.getPageable().getPageNumber(),
                        topicPage.getPageable().getPageSize()
                ),
                topicPage.getTotalElements());
    }

    @Override
    public TopicInformation getTopicPage(UUID pageId) {
        return topicRepository.findByPageId(pageId, TopicInformation.class).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("Page not found for id {0}", pageId))
        );
    }

    @Override
    public TopicInformation getTopicPage(String pageTitle) {
        return topicRepository
                .findByTitle(pageTitle, TopicInformation.class)
                .orElseGet(() -> getTopicPage(UUID.fromString(pageTitle)));
    }


    @Override
    public String updateTopicPage(FullTopicDTO fullTopicDTO) {

        Topic topicToUpdate = topicRepository.findById(fullTopicDTO.getPageId()).orElseThrow(() ->
                new NoSuchElementException(
                        MessageFormat
                                .format("Page not found for id {0}",
                                        fullTopicDTO.getPageId()))
        );
        topicMapper.updateTopicFromFullTopicDto(fullTopicDTO, topicToUpdate);
        topicToUpdate.setPageDescription(fullTopicDTO.getPageDescription());
        log.debug("topic new page desc ");
        if (StringUtils.isNotNullAndEmptyOrBlank(fullTopicDTO.getExternalResources())) {
            mapExternalResourcesToTopic(topicToUpdate, fullTopicDTO.getExternalResources());
        }
        if (StringUtils.isNotNullAndEmptyOrBlank(fullTopicDTO.getCodeSnippets())) {
            mapCodeSnippetToPageEntity(topicToUpdate, fullTopicDTO.getCodeSnippets());
        }
        if (StringUtils.isNotNullAndEmptyOrBlank(fullTopicDTO.getWikiInfo())) {
            WikiTopicPageId wikiTopicPageId = WikiTopicPageId.builder()
                    .pageId(topicToUpdate.getPageId())
                    .wikiId(fullTopicDTO.getWikiInfo().wikiId())
                    .build();
            if (!wikiTopicPageRepository.existsById(wikiTopicPageId)) {
                WikiTopicPage wikiTopicPage = WikiTopicPage.builder()
                        .wikiTopicPageId(wikiTopicPageId)
                        .topicPage(topicToUpdate)
                        .wikiCategory(wikiRepository.getReferenceById(fullTopicDTO.getWikiInfo().wikiId()))
                        .build();
                topicToUpdate.addWikiToTopicPage(wikiTopicPage);
            }
            wikiTopicPageRepository.deleteByWikiTopicPageIdNotInAndTopicPage(Set.of(wikiTopicPageId), topicToUpdate);
            topicToUpdate.setUrlPath(fullTopicDTO.getWikiInfo().wikiName() + "/" + topicToUpdate.getTitle());
            log.debug("Wiki info updated for topic: {}", topicToUpdate.getUrlPath());
        }
        return topicRepository.saveAndFlush(topicToUpdate).getUrlPath();
    }

    @Override
    public UUID reportPage(PageReportDTO pageReportDTO) {
        return pageReportService.createReport(pageReportDTO, pageEntityService.getPageEntity(pageReportDTO.getPageId()));
    }

    @Override
    public String createPage(FullTopicDTO fullTopicDTO) {
        Topic createdTopic = topicMapper.fullTopicDTOToTopic(fullTopicDTO);
        createdTopic.setPageId(UUID.randomUUID());
        if (fullTopicDTO.getCodeSnippets() != null) {
            createdTopic.setCodeSnippets(fullTopicDTO.getCodeSnippets().stream().map(
                    codeSnippetDTO -> CodeSnippet.builder()
                            .codeSnippetId(
                                    CodeSnippetId.builder()
                                            .pageId(createdTopic.getPageId())
                                            .languageTitle(codeSnippetDTO.getLanguageTitle())
                                            .build()
                            )
                            .topicPage(createdTopic)
                            .codeText(codeSnippetDTO.getCodeText())
                            .build()

            ).collect(Collectors.toSet()));
        }
        if (fullTopicDTO.getExternalResources() != null) {
            createdTopic.setTopicExternalResources(fullTopicDTO.getExternalResources().stream().map(
                    externalResourceDTO -> TopicExternalResource.builder()
                            .topicExternalResourceId(
                                    TopicExternalResourceId.builder()
                                            .pageId(createdTopic.getPageId())
                                            .externalResourceLink(externalResourceDTO.getExternalResourceLink())
                                            .build()
                            )
                            .topicPage(createdTopic)
                            .title(externalResourceDTO.getTitle())
                            .build()
            ).collect(Collectors.toSet()));
        }
        if (fullTopicDTO.getWikiInfo() != null) {
            wikiRepository.findById(fullTopicDTO.getWikiInfo().wikiId()).ifPresentOrElse(
                    (wiki) -> createdTopic.setParentTopicIds(List.of(WikiTopicPage.builder().wikiTopicPageId(
                                    WikiTopicPageId
                                            .builder()
                                            .wikiId(wiki.getWikiId())
                                            .pageId(createdTopic.getPageId()).build())
                            .topicPage(createdTopic).wikiCategory(wiki).build())),
                    () -> {
                        throw new NoSuchElementException(MessageFormat.format("Wiki not found for id {0}",
                                fullTopicDTO.getWikiInfo().wikiId()));
                    }
            );
            createdTopic.setUrlPath(fullTopicDTO.getWikiInfo().wikiName() + "/" + fullTopicDTO.getTitle());
        }
        if (StringUtils.isNotNullAndEmptyOrBlank(fullTopicDTO.getUserId())) {
            log.debug(MessageFormat.format("user id is not null {0}", fullTopicDTO.getUserId()));
            createdTopic.setCreatedBy(userService.getUser(fullTopicDTO.getUserId()));
        }

        return topicRepository.save(createdTopic).getUrlPath();
    }


    private void mapExternalResourcesToTopic(Topic topic, Set<TopicExternalResourcesDTO> externalResources) {
        externalResources.forEach((externalResource) -> {
                    TopicExternalResourceId topicExternalResourceId = TopicExternalResourceId.builder()
                            .externalResourceLink(externalResource.getExternalResourceLink())
                            .pageId(topic.getPageId())
                            .build();
                    // if it does not exist, add it
                    if (!topicExternalResourceRepository.existsById(topicExternalResourceId)) {
                        topic.addTopicExternalResource(TopicExternalResource.builder()
                                .topicExternalResourceId(topicExternalResourceId)
                                .topicPage(topic)
                                .title(externalResource.getTitle())
                                .build());
                    }else {
                        TopicExternalResource topicExternalResource = topicExternalResourceRepository.findById(topicExternalResourceId).orElseThrow();
                        topicExternalResource.setTitle(externalResource.getTitle());
                    }
                }
        );

        Set<TopicExternalResourceId> topicExternalResourceIds = externalResources.stream().map(externalResource -> TopicExternalResourceId.builder()
                .externalResourceLink(externalResource.getExternalResourceLink())
                .pageId(topic.getPageId())
                .build()).collect(Collectors.toSet());
        // delete the ones that are not in the list
        topicExternalResourceRepository
                .removeByTopicExternalResourceIdNotInAndTopicPage(topicExternalResourceIds, topic);
    }

    private void mapCodeSnippetToPageEntity(Topic page, Set<CodeSnippetDTO> codeSnippets) {
        codeSnippets.forEach((codeSnippetDTO -> {
            CodeSnippetId codeSnippetId = CodeSnippetId
                    .builder()
                    .pageId(page.getPageId())
                    .languageTitle(codeSnippetDTO.getLanguageTitle())
                    .build();
            if (!codeSnippetRepository.existsById(codeSnippetId)) {
                page.addCodeSnippet(CodeSnippet.builder()
                        .codeSnippetId(codeSnippetId)
                        .topicPage(page)
                        .codeText(codeSnippetDTO.getCodeText())
                        .build());
            }else {
                CodeSnippet codeSnippet = codeSnippetRepository.findById(codeSnippetId).orElseThrow();
                codeSnippet.setCodeText(codeSnippetDTO.getCodeText());
            }
        }));

        Set<CodeSnippetId> codeSnippetIds = codeSnippets.stream().map(codeSnippetDTO -> CodeSnippetId
                .builder()
                .pageId(page.getPageId())
                .languageTitle(codeSnippetDTO.getLanguageTitle())
                .build()).collect(Collectors.toSet());
        // remove the ones not present in the list
        codeSnippetRepository.removeByCodeSnippetIdNotInAndTopicPage(codeSnippetIds, page);
    }


    @Transactional
    @Override
    public LikeDislikeDTO userLikedOrDisliked(UUID userId, UUID pageId, boolean passedLikeDislike) {
        if (!topicRepository.existsById(pageId)) {
            throw new NoSuchElementException(
                    MessageFormat.format("page with Id {0} does not exits", pageId));
        }
        if (!userService.userExists(userId)) {
            throw new UsernameNotFoundException(
                    MessageFormat.format("Username with id {0} does not exists", userId));
        }

        LikeDislikeDTO newLikedDislikeDTO = pageVoteService.addPageVote(new LikeDislikeDTO(userId, pageId, passedLikeDislike));
        updateSingleTopicLikeDisliked(pageId);
        return newLikedDislikeDTO;

    }

    private void updateSingleTopicLikeDisliked(UUID pageId) {
        topicRepository.findById(pageId).ifPresent(currentTopic -> {
            currentTopic.setUpVotes(
                    pageVoteService.countVotes(currentTopic.getPageId(), true)
            );
            currentTopic.setDownVotes(
                    pageVoteService.countVotes(currentTopic.getPageId(), false)
            );
            topicRepository.save(currentTopic);
        });
        log.debug(MessageFormat.format("object with page id {0}, could not be found ", pageId));
    }

    //TODO should return a list of uuid of pages filtered by category
    @Override
    public ObjectPagedList<?> listTopicPagesByTags(UUID tagId, Pageable pageable) {
        return null;
    }

    @Transactional
    @Override
    public void deleteTopicPage(UUID pageId, UUID userId) {
        topicRepository.deleteById(pageId);
    }

    @Override
    public PageVoteId deleteVote(UUID userId, UUID pageId) {
        PageVoteId pageVoteId = PageVoteId.builder().pageId(pageId).userId(userId).build();
        if (pageVoteService.pageVoteExists(pageVoteId)) {
            pageVoteService.deletePageVote(userId, pageId);
            updateSingleTopicLikeDisliked(pageId);
            return pageVoteId;
        }
        throw new NoSuchElementException(MessageFormat.
                format("Vote for comment with id {0} is not present", pageId));
    }

    @Override
    public Object listVotesByPage(UUID pageId) {
        return pageVoteService.listVotesByPage(pageId);
    }

    @Override
    public Object listVotesByPageAndUserId(UUID pageId, UUID userId) {
        return pageVoteService.listVoteByPageAndUserId(pageId, userId);
    }

    @Override
    public Set<PageWikiInfo> getWikiInfo(Set<UUID> pageIds) {
        return topicRepository.findAllByPageIdNotIn(pageIds, PageWikiInfo.class);
    }

    @Override
    public boolean isPageNameUnique(String pageName) {
        return !topicRepository.existsByTitle(pageName);
    }

    @Override
    public void updateUrlPath(UUID pageId, String urlPath) {
        TopicNameAndIDOnly topicNameAndIDOnly = topicRepository.findByPageId(pageId, TopicNameAndIDOnly.class)
                .orElseThrow(() -> new NoSuchElementException(MessageFormat.format("Topic with id {0} does not exist", pageId)));
        if (!StringUtils.isNotNullAndEmptyOrBlank(urlPath)) topicRepository.updateUrlPath(pageId, "");

        topicRepository.updateUrlPath(pageId, topicNameAndIDOnly.getTitle() + "/" + urlPath);
    }
}
