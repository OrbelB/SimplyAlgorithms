package com.simplyalgos.backend.page;

import com.simplyalgos.backend.page.dto.CodeSnippetDTO;
import com.simplyalgos.backend.page.dto.FullTopicDTO;
import com.simplyalgos.backend.page.dto.TopicExternalResourcesDTO;
import com.simplyalgos.backend.page.dto.TopicStepsDTO;
import com.simplyalgos.backend.page.mappers.TopicMapper;
import com.simplyalgos.backend.report.PageReportRepository;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.tag.Tag;
import com.simplyalgos.backend.tag.TagRepository;
import com.simplyalgos.backend.tag.TagService;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.apache.bcel.classfile.Code;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import javax.transaction.Transactional;
import java.text.MessageFormat;
import java.util.*;
import java.util.stream.Collectors;

@AllArgsConstructor
@Slf4j
@Service
public class TopicServiceImpl implements TopicService {

    private final TopicRepository topicRepository;

    private final TopicMapper topicMapper;

    private final PageEntityRepository pageEntityRepository;

    private final PageVoteRepository pageVoteRepository;

    private final PageReportRepository pageReportRepository;

    private final CodeSnippetRepository codeSnippetRepository;

    private final TagService tagService;

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

    //TODO needs more work to remove childrens no specify
    @Transactional
    @Override
    public void updateTopicPage(FullTopicDTO fullTopicDTO) {
        Optional<Topic> topicToUpdate = topicRepository.findById(fullTopicDTO.getPageId());
        topicToUpdate.ifPresentOrElse(
                topic -> {
                    if (isNotNullAndEmpty(fullTopicDTO.getTitle())) topic.setTitle(fullTopicDTO.getTitle());
                    if (isNotNullAndEmpty(fullTopicDTO.getExplanation()))
                        topic.setExplanation(fullTopicDTO.getExplanation());
                    if (isNotNullAndEmpty(fullTopicDTO.getVideo())) topic.setVideo(fullTopicDTO.getVideo());
                    if (isNotNullAndEmpty(fullTopicDTO.getTimeComplexity()))
                        topic.setTimeComplexity(fullTopicDTO.getTimeComplexity());
                    if (isNotNullAndEmpty(fullTopicDTO.getRunningTime()))
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

    private boolean isNotNullAndEmpty(String xAttribute) {
        return !xAttribute.isEmpty() || !xAttribute.isBlank();
    }

    @Override
    public void reportPage(PageReportDTO pageReportDTO) {
        pageReportRepository.createReport(pageReportDTO.getReportMessage(), pageReportDTO.getUserId().toString(), pageReportDTO.getPageId().toString());
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
        Optional<PageEntity> topicPageType = pageEntityRepository.findById(createdTopic.getPageId());

        if (topicPageType.isPresent()) {
            log.debug(MessageFormat.format("Page {0} exists", topicPageType.get().getPageId()));
            tagService.mapTagToPageId(topicPageType.get(), fullTopicDTO.getTags());
            if (fullTopicDTO.getCodeSnippet() != null)
                createdTopic.setCodeSnippets(mapCodeSnippetToPageEntity(createdTopic, fullTopicDTO.getCodeSnippet()));
            if (fullTopicDTO.getExternalResources() != null)
                createdTopic.setTopicExternalResources(mapExternalResourcesToTopic(createdTopic, fullTopicDTO.getExternalResources()));
            if (fullTopicDTO.getSteps() != null)
                createdTopic.setTopicSteps(mapStepsToTopic(createdTopic, fullTopicDTO.getSteps()));
            //save changes
            //topicRepository.save(createdTopic);
        } else {
            throw new NoSuchElementException("page entity could not be initialized");
        }
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
        //if external resource exists retrieve, don't update created ones, you can only delete them, but if the object exits updated
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


    @Override
    public void userLikedOrDisliked(UUID userId, UUID pageId, boolean passedLikeDislike) {
        //check if the like or dislike exists
        pageVoteRepository.findByPageVoteId(
                PageVoteId
                        .builder()
                        .pageId(pageId)
                        .userId(userId)
                        .build()
        ).ifPresentOrElse(
                page -> pageVoteRepository.updateLikeDislike(passedLikeDislike, userId.toString(), pageId.toString()), //invert the like/dislike
                () -> pageVoteRepository //create the new user vote
                        .save(PageVote.builder()
                                .like_dislike(passedLikeDislike)
                                .pageVoteId(
                                        PageVoteId
                                                .builder()
                                                .userId(userId)
                                                .pageId(pageId)
                                                .build()
                                ).build()
                        )
        );
        //update forum
        updateSingleTopicLikeDisliked(pageId);
    }

    private void updateSingleTopicLikeDisliked(UUID pageId) {
        topicRepository.findById(pageId).ifPresent(currentTopic -> {
            currentTopic.setUpVotes(
                    getLikedOrDislikes(currentTopic.getPageId(), true)
            );
            currentTopic.setDownVotes(
                    getLikedOrDislikes(currentTopic.getPageId(), false)
            );
            topicRepository.save(currentTopic);
        });
        log.debug(MessageFormat.format("object with page id {0}, could not be found ", pageId));
    }

    private Integer getLikedOrDislikes(UUID pageId, Boolean likeDislike) {
        return pageVoteRepository.countLikeDislikeByPage(pageId.toString().trim(), likeDislike).orElse(0);
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
}
