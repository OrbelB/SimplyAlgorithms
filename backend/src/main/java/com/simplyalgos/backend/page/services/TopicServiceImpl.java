package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.page.repositories.TopicStepRepository;
import com.simplyalgos.backend.page.domains.TopicSteps;
import com.simplyalgos.backend.page.domains.*;
import com.simplyalgos.backend.page.dtos.*;
import com.simplyalgos.backend.page.mappers.TopicMapper;
import com.simplyalgos.backend.page.repositories.CodeSnippetRepository;
import com.simplyalgos.backend.page.repositories.TopicExternalResourceRepository;
import com.simplyalgos.backend.page.repositories.TopicRepository;
import com.simplyalgos.backend.report.services.PageReportService;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.tag.services.TagService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.utils.StringUtils;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.text.MessageFormat;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class TopicServiceImpl implements TopicService {
    private final PageVoteService pageVoteService;

    private final TopicRepository topicRepository;

    private final TopicMapper topicMapper;

    private final PageEntityService pageEntityService;

    private final PageReportService pageReportService;

    private final CodeSnippetRepository codeSnippetRepository;

    private final TagService tagService;

    private final UserService userService;

    private final TopicStepRepository topicStepRepository;

    private final TopicExternalResourceRepository topicExternalResourceRepository;

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
    public FullTopicDTO getTopicPage(UUID pageId) {
        return topicMapper.topicToFullTopicDTO(topicRepository.findById(pageId).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("Element not found for id {0}", pageId))
        ));
    }

    //TODO needs more work to remove children no specify
    @Transactional
    @Override
    public void updateTopicPage(FullTopicDTO fullTopicDTO) {
        Optional<Topic> topicToUpdate = topicRepository.findById(fullTopicDTO.getPageId());
        topicToUpdate.ifPresentOrElse(
                topic -> {
                    if (StringUtils.isNotNullAndEmptyOrBlank(fullTopicDTO.getTitle())) topic.setTitle(fullTopicDTO.getTitle());
                    if (StringUtils.isNotNullAndEmptyOrBlank(fullTopicDTO.getExplanation()))
                        topic.setExplanation(fullTopicDTO.getExplanation());
                    if (StringUtils.isNotNullAndEmptyOrBlank(fullTopicDTO.getVideo())) topic.setVideo(fullTopicDTO.getVideo());
                    if (StringUtils.isNotNullAndEmptyOrBlank(fullTopicDTO.getTimeComplexity()))
                        topic.setTimeComplexity(fullTopicDTO.getTimeComplexity());
                    if (StringUtils.isNotNullAndEmptyOrBlank(fullTopicDTO.getRunningTime()))
                        topic.setRunningTime(fullTopicDTO.getRunningTime());
                    if (fullTopicDTO.getSteps() != null)
                        mapStepsToTopic(topic, fullTopicDTO.getSteps());
                    if (fullTopicDTO.getExternalResources() != null)
                        mapExternalResourcesToTopic(topic, fullTopicDTO.getExternalResources());
                    if (fullTopicDTO.getCodeSnippet() != null)
                        mapCodeSnippetToPageEntity(topic, fullTopicDTO.getCodeSnippet());
                    if (fullTopicDTO.getTags() != null)
                        tagService.mapTagToPageId(topic.getPageEntityId(), fullTopicDTO.getTags());
                    topicRepository.save(topic);
                }
                , () ->
                        log.error(MessageFormat.format("Topic with {0} could not be found", fullTopicDTO.getPageId())));

    }

    @Override
    public UUID reportPage(PageReportDTO pageReportDTO) {
        return pageReportService.createReport(pageReportDTO, pageEntityService.getPageEntity(pageReportDTO.getPageId()));

    }

    @Transactional
    @Override
    public void createPage(FullTopicDTO fullTopicDTO) {
        Topic createdTopic = topicRepository.saveAndFlush(
                Topic.builder()
                        .pageId(UUID.randomUUID())
                        .title(fullTopicDTO.getTitle())
                        .explanation(fullTopicDTO.getExplanation())
                        .runningTime(fullTopicDTO.getRunningTime())
                        .timeComplexity(fullTopicDTO.getTimeComplexity())
                        .video(fullTopicDTO.getVideo())
                        .build()
        );

        //get page entity to map the other attributes
        PageEntity topicPageType = pageEntityService.getPageEntity(createdTopic.getPageId());

        log.debug(MessageFormat.format("Page {0} exists", topicPageType.getPageId()));
        tagService.mapTagToPageId(topicPageType, fullTopicDTO.getTags());
        if (fullTopicDTO.getCodeSnippet() != null)
            createdTopic.setCodeSnippets(mapCodeSnippetToPageEntity(createdTopic, fullTopicDTO.getCodeSnippet()));
        if (fullTopicDTO.getExternalResources() != null)
            createdTopic.setTopicExternalResources(mapExternalResourcesToTopic(createdTopic, fullTopicDTO.getExternalResources()));
        if (fullTopicDTO.getSteps() != null)
            createdTopic.setTopicSteps(mapStepsToTopic(createdTopic, fullTopicDTO.getSteps()));
        //save changes
        //topicRepository.save(createdTopic);
    }


    //future --  improve logic
    private List<TopicSteps> mapStepsToTopic(Topic createdTopic, Set<TopicStepsDTO> stepsDTOS) {
        return stepsDTOS.stream().map(stepDTO -> {
                    if (stepDTO.getStepId() != null) {
                        Optional<TopicSteps> topicStepsOptional = topicStepRepository.findById(stepDTO.getStepId());
                        if (topicStepsOptional.isPresent()) {
                            topicStepsOptional.get().setStep(stepDTO.getStep());
                            topicStepsOptional.get().setStepNumber(stepDTO.getStepNumber());
                            return topicStepRepository.save(topicStepsOptional.get());
                        }
                    }
                    return topicStepRepository.save(
                            TopicSteps
                                    .builder().
                                    step(stepDTO.getStep())
                                    .stepNumber(stepDTO.getStepNumber())
                                    .topicPage(createdTopic)
                                    .build());
                }
        ).toList();
    }

    //TODO fix removing the topics from pages if the user removes them
    @Transactional
    protected void removeResourceTopicFromPage(Topic topic, Set<TopicExternalResourcesDTO> topicExternalResource) {

        List<TopicExternalResource> topicExternalResources = topicExternalResourceRepository
                .findAllByTopicExternalResourceIdIsNotInAndTopicExternalResourceId_PageId(
                        topicExternalResource.stream().map(topicExternalR -> TopicExternalResourceId
                                        .builder()
                                        .externalResourceLink(topicExternalR.getExternalResourceLink())
                                        .pageId(topic.getPageId())
                                        .build())
                                .collect(Collectors.toSet()), topic.getPageId()
                );
        log.debug(MessageFormat.format("objects to remove should be one 1 {0}", topicExternalResources.size()));
        topicExternalResourceRepository.deleteAll(topicExternalResources);
    }

    private List<TopicExternalResource> mapExternalResourcesToTopic(Topic topic, Set<TopicExternalResourcesDTO> externalResources) {
        //needs some work redone
        //removeResourceTopicFromPage(topic, externalResources);
        //if external resource exists retrieve, don't update created ones, you can only delete them, but if the object exits update it
        return externalResources
                .stream()
                .map(
                        externalResource -> {
                            Optional<TopicExternalResource> optionalResource = topicExternalResourceRepository.findById(
                                    TopicExternalResourceId.builder()
                                            .pageId(topic.getPageId())
                                            .externalResourceLink(externalResource.getExternalResourceLink())
                                            .build());
                            return optionalResource.orElseGet(() -> topicExternalResourceRepository.save(
                                    TopicExternalResource
                                            .builder()
                                            .topicExternalResourceId(
                                                    TopicExternalResourceId
                                                            .builder()
                                                            .externalResourceLink(externalResource.getExternalResourceLink())
                                                            .pageId(topic.getPageId())
                                                            .build()
                                            )
                                            .build()));
                        }
                ).toList();
    }

    private List<CodeSnippet> mapCodeSnippetToPageEntity(Topic page, Set<CodeSnippetDTO> codeSnippets) {
        return codeSnippets.stream().map(codeSnippetDTO -> {
            Optional<CodeSnippet> optionalCodeSnippet = codeSnippetRepository.findById(
                    CodeSnippetId
                            .builder()
                            .pageId(page.getPageId())
                            .languageTitle(codeSnippetDTO.getLanguageTitle())
                            .build()
            );
            if (optionalCodeSnippet.isPresent()) {
                CodeSnippet currentCodeSnippet = optionalCodeSnippet.get();
                //just update the code text, no need to update the rest
                log.debug(MessageFormat.format("check if the information exists {0}", currentCodeSnippet.getCodeText()));
                currentCodeSnippet.setCodeText(codeSnippetDTO.getCodeText());
                return codeSnippetRepository.save(currentCodeSnippet);
            } else {
                log.debug(MessageFormat.format("could the error be here? {0}", codeSnippetDTO.getLanguageTitle()));
                return codeSnippetRepository.save(
                        CodeSnippet.builder()
                                .codeSnippetId(CodeSnippetId
                                        .builder()
                                        .pageId(page.getPageId())
                                        .languageTitle(codeSnippetDTO.getLanguageTitle())
                                        .build())
                                .codeText(codeSnippetDTO.getCodeText()).
                                build()
                );
            }

        }).toList();
    }


    @Transactional
    @Override
    public LikeDislikeDTO userLikedOrDisliked(UUID userId, UUID pageId, boolean passedLikeDislike) {
        if (topicRepository.existsById(pageId)) {
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
}
