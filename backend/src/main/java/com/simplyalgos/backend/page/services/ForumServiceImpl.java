package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.page.domains.Forum;
import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.page.domains.PageVoteId;
import com.simplyalgos.backend.page.dto.ForumDTO;
import com.simplyalgos.backend.page.dto.FullForumDTO;
import com.simplyalgos.backend.page.dto.LikeDislikeDTO;
import com.simplyalgos.backend.page.mappers.ForumMapper;
import com.simplyalgos.backend.page.repositories.ForumRepository;
import com.simplyalgos.backend.report.services.PageReportService;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.tag.services.TagService;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import lombok.RequiredArgsConstructor;
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


@Slf4j
@RequiredArgsConstructor
@Service
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
        Page<Forum> forumPage = forumRepository.findAll(pageable);
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

    @Transactional
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

    @Transactional
    @Override
    public LikeDislikeDTO userLikedOrDisliked(UUID userId, UUID pageId, boolean passedLikeDislike) {
        if (!forumRepository.existsById(pageId)) {
            throw new NoSuchElementException(
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

    @Transactional
    @Override
    public UUID deleteForum(String pageId, String userId) {
        forumRepository.deleteByPageID(pageId);
        return UUID.fromString(userId);
    }

    @Override
    public FullForumDTO getForumPage(String pageId) {
        return forumMapper.forumToFullForumDto(forumRepository.findById(UUID.fromString(pageId)).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("Element {0} not found", UUID.fromString(pageId)))
        ));
    }


    @Override
    public FullForumDTO updateForum(ForumDTO forumDTO) {
        Optional<Forum> optionalForumToUpdate = forumRepository.findById(forumDTO.getPageId());
        Forum forum;
        if (optionalForumToUpdate.isPresent()) {
            forum = optionalForumToUpdate.get();
            if (forum.getCreatedBy().getUserId().equals(forumDTO.getUserDto().getUserId())) {
                if (isNotNullAndEmpty(forumDTO.getTitle())) forum.setTitle(forumDTO.getTitle());
                if (isNotNullAndEmpty(forumDTO.getPhoto())) forum.setPhoto(forumDTO.getPhoto());
                if (isNotNullAndEmpty(forumDTO.getVideo())) forum.setVideo(forumDTO.getVideo());
                if (isNotNullAndEmpty(forumDTO.getDescriptionText()))
                    forum.setDescriptionText(forumDTO.getDescriptionText());
                forum.getPageEntityId().setTags(new HashSet<>(tagService.mapTagToPageId(forum.getPageEntityId(), forumDTO.getTags())));
            }
            return forumMapper.forumToFullForumDto(forumRepository.save(forum));
        }
        throw new NoSuchElementException(MessageFormat.format("no such an object", forumDTO.getPageId()));
    }


    private boolean isNotNullAndEmpty(String xAttribute) {
        if (xAttribute == null) return false;
        return !xAttribute.isEmpty() || !xAttribute.isBlank();
    }

    @Transactional
    @Override
    public UUID reportForum(PageReportDTO forumReport) {
        return pageReportService.createReport(forumReport, pageEntityService.getPageEntity(forumReport.getPageId()));

    }

    @Transactional
    @Override
    public PageVoteId deleteVote(UUID userId, UUID pageId) {
        PageVoteId pageVoteId = PageVoteId.builder().pageId(pageId).userId(userId).build();
        if (pageVoteService.pageVoteExists(pageVoteId)) {
            log.debug("I am inside delete vote and page does exists");
            pageVoteService.deletePageVote(userId, pageId);
            updateSingleForumLikeDisliked(pageId);
            return pageVoteId;
        }
        throw new NoSuchElementException(MessageFormat.
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
    public FullForumDTO addForumUserView(UUID userId, UUID pageId) {
        viewsService.addUserView(userId, pageId);
        return getForumPage(pageId.toString());
    }

    @Override
    public List<?> listForumsByUserViewForums(UUID userId, Pageable pageable) {
        Iterable<UUID> pageIds = viewsService
                .listForumsByUserView(userId)
                .stream()
                .map(views -> views
                        .getPageViewed().getPageId()
                ).collect(Collectors.toSet());
        return forumRepository.findAllById(pageIds).stream().map(forumMapper::forumToFullForumDto).toList();
    }


}
