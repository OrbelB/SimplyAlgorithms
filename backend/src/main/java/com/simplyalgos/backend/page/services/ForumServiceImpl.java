package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.page.domains.Forum;
import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.page.domains.ids.PageVoteId;
import com.simplyalgos.backend.page.dtos.ForumDTO;
import com.simplyalgos.backend.page.dtos.FullForumDTO;
import com.simplyalgos.backend.page.dtos.LikeDislikeDTO;
import com.simplyalgos.backend.page.mappers.ForumMapper;
import com.simplyalgos.backend.page.repositories.ForumRepository;
import com.simplyalgos.backend.page.repositories.projection.ForumInformation;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.report.services.PageReportService;
import com.simplyalgos.backend.tag.services.TagService;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.*;
import java.util.stream.Collectors;


@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class ForumServiceImpl implements ForumService {

    private final PageVoteService pageVoteService;
    private final ForumRepository forumRepository;
    private final ForumMapper forumMapper;
    private final TagService tagService;
    private final PageEntityService pageEntityService;
    private final PageReportService pageReportService;
    private final UserService userService;

    private final ViewsService viewsService;

    @Override
    public ObjectPagedList<?> listForumPages(Pageable pageable) {
        Page<ForumInformation> forumPage = forumRepository.findAllProjectBy(pageable, ForumInformation.class);
        return new ObjectPagedList<>(
                forumPage.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        forumPage.getPageable().getPageNumber(),
                        forumPage.getPageable().getPageSize(),
                        forumPage.getSort()),
                forumPage.getTotalElements()
        );
    }

    @Override
    public ObjectPagedList<?> filterForumsByTag(Pageable pageable, String tag) {
        Page<Forum> forumPage = forumRepository.findAllByPageEntityId_Tags_Tag(tag, pageable);
        return new ObjectPagedList<>(
                forumPage.stream()
                        .map(forumMapper::forumToFullForumDto)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        forumPage.getPageable().getPageNumber(),
                        forumPage.getPageable().getPageSize(),
                        forumPage.getSort()),
                forumPage.getTotalElements()
        );
    }


    @Override
    public UUID createForum(ForumDTO forumDTO) {
        // check if a user has been created
        log.debug(MessageFormat.format("user id {0} ", forumDTO.getUserDto().getUserId()));
        User user = userService.getUser(forumDTO.getUserDto().getUserId());
        Forum forum = forumRepository.saveAndFlush(
                Forum.builder()
                        .pageId(UUID.randomUUID())
                        .createdBy(user)
                        .descriptionText(forumDTO.getDescriptionText())
                        .photo(forumDTO.getPhoto())
                        .video(forumDTO.getVideo())
                        .title(forumDTO.getTitle())
                        .build()
        );

        //get the page entity
        PageEntity forumType = pageEntityService.getPageEntity(forum.getPageId());
        log.debug(MessageFormat.format("trying to get data from page entity {0}", forumType.getPageId()));
        tagService.mapTagToPageId(forumType, forumDTO.getTags());
        return forum.getPageId();
    }

    @Override
    public LikeDislikeDTO userLikedOrDisliked(UUID userId, UUID pageId, boolean passedLikeDislike) {
        if (!forumRepository.existsById(pageId)) {
            throw new ElementNotFoundException(
                    MessageFormat.format("page with Id {0} does not exits", pageId));
        }
        if (!userService.userExists(userId)) {
            throw new UsernameNotFoundException(
                    MessageFormat.format("Username with id {0} does not exists", userId));
        }
        LikeDislikeDTO likeDislikeDTO = pageVoteService.addPageVote(new LikeDislikeDTO(userId, pageId, passedLikeDislike));
        updateSingleForumLikeDisliked(pageId);
        return likeDislikeDTO;
    }

    private void updateSingleForumLikeDisliked(UUID pageId) {
        forumRepository.findById(pageId).ifPresent(currentForum -> {
            currentForum.setUpVotes(
                    pageVoteService.countVotes(currentForum.getPageId(), true)
            );
            currentForum.setDownVotes(
                    pageVoteService.countVotes(currentForum.getPageId(), false)
            );
            forumRepository.save(currentForum);
        });
        log.debug(MessageFormat.format("object with page id {0}, could not be found ", pageId));
    }

    @Override
    public UUID deleteForum(String pageId, String userId) {
        forumRepository.deleteByPageID(pageId);
        return UUID.fromString(userId);
    }

    @Override
    public ForumInformation getForumPage(String pageId) {
        return forumRepository.findByPageId(UUID.fromString(pageId), ForumInformation.class)
                .orElseThrow(() -> new NoSuchElementException(MessageFormat.format("Element {0} not found", UUID.fromString(pageId))));
    }


    @Override
    public FullForumDTO updateForum(ForumDTO forumDTO) {
        Forum forum = forumRepository.findById(forumDTO.getPageId()).orElseThrow(() ->
                new ElementNotFoundException(
                        MessageFormat.
                                format("Forum with page Id {0} is not present ", forumDTO.getPageId())
                )
        );

        if (Objects.equals(forum.getCreatedBy().getUserId(), forumDTO.getUserDto().getUserId())) {
            forumMapper.updateForumFromForumDto(forumDTO, forum);
            forum.getPageEntityId().setTags(new HashSet<>(tagService.mapTagToPageId(forum.getPageEntityId(), forumDTO.getTags())));
        }
        return forumMapper.forumToFullForumDto(forumRepository.save(forum));
    }

    @Override
    public UUID reportForum(PageReportDTO forumReport) {
        return pageReportService.createReport(forumReport, pageEntityService.getPageEntity(forumReport.getPageId()));
    }

    @Override
    public PageVoteId deleteVote(UUID userId, UUID pageId) {
        PageVoteId pageVoteId = PageVoteId.builder().pageId(pageId).userId(userId).build();
        if (pageVoteService.pageVoteExists(pageVoteId)) {
            log.debug("I am inside delete vote and page does exists");
            pageVoteService.deletePageVote(userId, pageId);
            updateSingleForumLikeDisliked(pageId);
            return pageVoteId;
        }
        throw new ElementNotFoundException(MessageFormat.
                format("Vote for pageId with id {0} is not present", pageId));
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

    @Override
    public Object listVotesByPage(UUID pageId) {
        return pageVoteService.listVotesByPage(pageId);
    }

    @Override
    public Object getForumVoteByPageAndUserId(UUID pageId, UUID userId) {
        return pageVoteService.listVoteByPageAndUserId(pageId, userId);
    }

    @Override
    public ForumInformation addForumUserView(UUID userId, UUID pageId) {
        viewsService.addUserView(userId, pageId);
        removedViewedForumsPerUser(userId);
        return getForumPage(pageId.toString());
    }

    @Override
    public List<?> listForumsByUserViewForums(UUID userId, Pageable pageable) {
        List<UUID> pageIds = viewsService
                .listForumsByUserView(userId)
                .stream()
                .map(views -> views.getViewsId().getPageId())
                .collect(Collectors.toCollection(LinkedList::new));
        return pageIds.stream()
                .flatMap(id -> forumRepository
                        .findById(id)
                        .map(forumMapper::forumToFullForumDto)
                        .stream()
                )
                .collect(Collectors.toList());
    }

    private void removedViewedForumsPerUser(UUID userId) {
        Integer count = viewsService.countViewedForumsPerUser(userId);
        log.debug(MessageFormat.format("The amount of viewed forums for this user is {0}", count.toString()));
        if (count >= 10) {
            viewsService.removeView(userId);
            return;
        }
        log.debug(MessageFormat.format("Not enough views to remove from user with id {0}", userId.toString()));
    }


}
