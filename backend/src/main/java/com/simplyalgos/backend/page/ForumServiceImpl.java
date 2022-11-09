package com.simplyalgos.backend.page;

import com.simplyalgos.backend.page.dto.ForumDTO;
import com.simplyalgos.backend.page.dto.FullForumDTO;
import com.simplyalgos.backend.page.mappers.ForumMapper;
import com.simplyalgos.backend.report.PageReportRepository;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.tag.TagService;
import com.simplyalgos.backend.user.User;
import com.simplyalgos.backend.user.UserRepository;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.MessageFormat;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@RequiredArgsConstructor
@Service
public class ForumServiceImpl implements ForumService {

    private final ForumRepository forumRepository;
    private final ForumMapper forumMapper;
    private final PageVoteRepository pageVoteRepository;
    private final PageReportRepository pageReportRepository;
    private final UserRepository userRepository;
    private final TagService tagService;

    private final PageEntityRepository pageEntityRepository;

    @Override
    public ObjectPagedList<ForumDTO> listForumPages(Pageable pageable) {
        //find a better way to update the likes and dislikes
        Page<Forum> forumPage = forumRepository.findAll(pageable);
        return new ObjectPagedList<>(
                forumPage.stream()
                        .map(forumMapper::forumToForumDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        forumPage.getPageable().getPageNumber(),
                        forumPage.getPageable().getPageSize(),
                        forumPage.getSort()),
                forumPage.getTotalElements()
        );
    }

    //missing mapping tag to page
    @Transactional
    @Override
    public void createForum(ForumDTO forumDTO) {
        // check if a user has been created
        Optional<User> user = userRepository.findById(forumDTO.getUserDto().getUserId());
        if (user.isPresent()) {
            Forum forum = forumRepository.saveAndFlush(
                    Forum.builder()
                            .pageId(UUID.randomUUID())
                            .createdBy(user.get())
                            .descriptionText(forumDTO.getDescriptionText())
                            .photo(forumDTO.getPhoto())
                            .video(forumDTO.getVideo())
                            .title(forumDTO.getTitle())
                            .build()
            );

            //get the page entity
            Optional<PageEntity> forumType = pageEntityRepository.findById(forum.getPageId());


            if (forumType.isPresent()) {
                log.debug(MessageFormat.format("trying to get data from page entity {0}", forumType.get().getPageId()));

                tagService.mapTagToPageId(forumType.get(), forumDTO.getTags());
            } else {
                throw new NoSuchElementException("page entity could not be initialized");
            }

        }
    }


    @Deprecated
    @Transactional
    protected void updateAmountOfUpVotesAndDownVotes() {
        log.info("Updating amount of up votes and down votes for each page");
        List<Forum> forumSet = forumRepository.findAll();
        try {
            forumSet.forEach(forum -> {
                        forum.setUpVotes(getLikedOrDislikes(forum.getPageId(), true));
                        forum.setDownVotes(getLikedOrDislikes(forum.getPageId(), false));
                    }
            );
            forumRepository.saveAll(forumSet);
        } catch (Exception ex) {
            log.error(MessageFormat.format("the error is {0} in updateAmount... ", ex));
        }

    }

    private Integer getLikedOrDislikes(UUID pageId, Boolean likeDislike) {
        return pageVoteRepository.countLikeDislikeByPage(pageId.toString().trim(), likeDislike).orElse(0);
    }

    @Transactional
    @Override
    public void userLikedOrDisliked(UUID userId, UUID pageId, Boolean passedLikeDislike) {
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
        updateSingleForumLikeDisliked(pageId);
    }

    private void updateSingleForumLikeDisliked(UUID pageId) {
        forumRepository.findById(pageId).ifPresent(currentForum -> {
            currentForum.setUpVotes(
                    getLikedOrDislikes(currentForum.getPageId(), true)
            );
            currentForum.setDownVotes(
                    getLikedOrDislikes(currentForum.getPageId(), false)
            );
            forumRepository.save(currentForum);
        });
        log.debug(MessageFormat.format("object with page id {0}, could not be found ", pageId));
    }

    @Transactional
    @Override
    public void deleteForum(String pageId, String userId) {
        forumRepository.deleteByPageID(pageId);
    }

    @Override
    public FullForumDTO getForumPage(String pageId) {
        return forumMapper.forumToFullForumDto(forumRepository.findById(UUID.fromString(pageId)).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("Element {0} not found", UUID.fromString(pageId)))
        ));
    }

    @Override
    public void updateForum(ForumDTO forumDTO) {
        Optional<Forum> forumToUpdate = forumRepository.findById(forumDTO.getPageId());
        forumToUpdate.ifPresentOrElse(forum -> {
            log.debug(MessageFormat.format("forum {0} is present", forum.getPageId()));
            if (forum.getCreatedBy().getUserId().equals(forumDTO.getUserDto().getUserId())) {
                if (isNotNullAndEmpty(forumDTO.getTitle())) forum.setTitle(forumDTO.getTitle());
                if (isNotNullAndEmpty(forumDTO.getPhoto())) forum.setPhoto(forumDTO.getPhoto());
                if (isNotNullAndEmpty(forumDTO.getVideo())) forum.setVideo(forumDTO.getVideo());
                if (isNotNullAndEmpty(forumDTO.getDescriptionText()))
                    forum.setDescriptionText(forumDTO.getDescriptionText());
                if (forumDTO.getTags() != null && forumDTO.getTags().size() != 0)
                    tagService.mapTagToPageId(forum.getPageEntityId(), forumDTO.getTags());
            }
            forumRepository.save(forum);
        }, () -> log.info(MessageFormat.format("no such an object", forumDTO.getPageId())));
    }

    private boolean isNotNullAndEmpty(String xAttribute) {
        if (xAttribute == null) return false;
        return !xAttribute.isEmpty() || !xAttribute.isBlank();
    }

    @Transactional
    @Override
    public void reportForum(PageReportDTO forumReport) {
        pageReportRepository
                .createReport(forumReport.getReportMessage(),
                        forumReport.getUserId().toString(),
                        forumReport.getPageId().toString());
    }

    @Override
    public ObjectPagedList<ForumDTO> listForumPagesByTags(UUID tagId, Pageable pageable) {
        Page<Forum> forumPage = forumRepository.findAllByPageEntityId_Tags_TagId(tagId, pageable);
        return new ObjectPagedList<>(
                forumPage.stream()
                        .map(forumMapper::forumToForumDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        forumPage.getPageable().getPageNumber(),
                        forumPage.getPageable().getPageSize(),
                        forumPage.getSort()),
                forumPage.getTotalElements()
        );
    }

}
