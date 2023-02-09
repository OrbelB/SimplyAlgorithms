package com.simplyalgos.backend.comment.services;


import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.comment.domains.CommentVoteId;
import com.simplyalgos.backend.comment.domains.ParentChildComment;
import com.simplyalgos.backend.comment.dto.*;
import com.simplyalgos.backend.comment.enums.CommentType;
import com.simplyalgos.backend.comment.mappers.CommentMapper;
import com.simplyalgos.backend.comment.repositories.CommentRepository;
import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.page.dtos.FullForumDTO;
import com.simplyalgos.backend.page.dtos.FullTopicDTO;
import com.simplyalgos.backend.page.services.ForumService;
import com.simplyalgos.backend.page.services.PageEntityService;
import com.simplyalgos.backend.page.services.TopicService;
import com.simplyalgos.backend.report.services.CommentReportService;
import com.simplyalgos.backend.report.dtos.CommentReportDTO;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.services.DashboardService;
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
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final PageEntityService pageEntityService;
    private final CommentMapper commentMapper;
    private final UserService userService;
    private final ParentChildCommentService parentChildCommentService;
    private final CommentVoteService commentVoteService;
    private final CommentReportService commentReportService;

    private final ForumService forumService;

    private final TopicService topicService;
    private final DashboardService dashboardService;

    @Override
    public ObjectPagedList<?> listComments(Pageable pageable) {
        Page<Comment> commentPage = commentRepository.findAll(pageable);
        return new ObjectPagedList<>(
                commentPage
                        .stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        commentPage.getPageable().getPageNumber(),
                        commentPage.getPageable().getPageSize()),
                commentPage.getTotalElements()
        );
    }

    @Override
    public CommentToSendDTO createParentComment(CommentDTO commentDTO) {
        log.debug(MessageFormat.format("The user id {0}", commentDTO.userId()));
        PageEntity page = pageEntityService.getPageEntity(commentDTO.pageId());

        try {
            FullForumDTO forumDTO = forumService.getForumPage(String.valueOf(page.getPageId()));
            dashboardService.addForumNotification(forumDTO, userService.getUser(forumDTO.getUserDto().getUserId()));
        }catch (ElementNotFoundException e) {
            log.info("Forum page not found, skipping notification");
        }

//        try {
//            FullForumDTO forumDTO = forumservice.getForumPage(String.valueOf(commentDTO.pageId()));
//            User userToNotified = userService.getUser(forumDTO.getUserDto().getUserId());
//            if (userPreferenceService
//                    .isNotificationEnableForType(NotificationType.POST_REPLIES, userToNotified.getUserId())) {
//                userNotificationService
//                        .addNotification(commentDTO.pageId(),
//                                forumDTO.getTitle(),
//                                userToNotified,
//                                NotificationMessage.FORUM);
//            }
//        } catch (ElementNotFoundException e) {
//            log.info("Forum page not found, skipping notification");
//        }

        return commentMapper.commentToCommentBasicDTO(commentRepository
                .saveAndFlush(Comment.builder()
                        .commentText(commentDTO.commentText())
                        .createdBy(userService.getUser(commentDTO.userId()))
                        .isParentChild(CommentType.PARENT.label)
                        .pageComment(page)
                        .likes(0)
                        .dislikes(0)
                        .build()), commentDTO.pageId());
    }

    protected Comment getCommentById(UUID commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() ->
                        new ElementNotFoundException("Comment has been deleted or never created"));
    }


    @Override
    public CommentToSendDTO createChildComment(ChildCommentDTO commentDTO) {

        User userToNotified = userService.getUser(getCommentById(commentDTO.getParentCommentId()).getCreatedBy().getUserId());
        PageEntity page = pageEntityService.getPageEntity(commentDTO.getChildComment().pageId());
        try {
            FullTopicDTO fullTopicDTO = topicService.getTopicPage(page.getPageId());
            dashboardService.addTopicNotification(fullTopicDTO, userToNotified);
        } catch (ElementNotFoundException e) {
            log.info("Topic page not found, skipping notification");
        }

//        // handle notification
//        if (userPreferenceService.isNotificationEnableForType(NotificationType.REPLIES_NOTIFICATION, userToNotified.getUserId())) {
//            try {
//                FullTopicDTO fullTopicDTO = topicService.getTopicPage(page.getPageId());
//                userNotificationService.addNotification(page.getPageId(), fullTopicDTO.getTitle(), userToNotified, NotificationMessage.REPLY);
//            } catch (ElementNotFoundException e) {
//                log.info("Element was not found");
//            }
//        }

        Comment childCommentCreated = commentRepository
                .saveAndFlush(Comment
                        .builder()
                        .commentText(commentDTO.getChildComment().commentText())
                        .createdBy(userService.getUser(commentDTO.getChildComment().userId()))
                        .isParentChild(CommentType.CHILD.label)
                        .pageComment(page)
                        .likes(0)
                        .dislikes(0)
                        .build());

        //check if parent comment is present; map the child comment to its parent
        if (isCommentPresent(commentDTO.getParentCommentId()))
            parentChildCommentService.createParentChildMapping(childCommentCreated, commentDTO.getParentCommentId());

        return commentMapper.commentToCommentBasicDTO(childCommentCreated, commentDTO.getParentCommentId());
    }


    @Override
    public CommentToSendDTO updateComment(CommentDTO commentDTO) {
        Optional<Comment> optionalCommentToUpdate = commentRepository.findById(commentDTO.commentId());

        log.info("do I ever get here?");
        Comment commentToUpdate;
        if (optionalCommentToUpdate.isPresent()) {
            commentToUpdate = optionalCommentToUpdate.get();
            if (isNotNullEmptyAndBlank(commentDTO.commentText())) {
                commentToUpdate.setCommentText(commentDTO.commentText());
            }
            if (commentToUpdate.getIsParentChild().equals(CommentType.PARENT.label)) {
                return commentMapper.commentToCommentBasicDTO(commentRepository.save(commentToUpdate), commentDTO.pageId());
            } else if (commentToUpdate.getIsParentChild().equals(CommentType.CHILD.label)) {
                return commentMapper.commentToCommentBasicDTO(commentRepository.save(commentToUpdate), findCommentIdParent(commentToUpdate));
            } else {
                throw new NoSuchElementException("Not a valid type of comment");
            }

        }
        throw new NoSuchElementException(MessageFormat.format("Comment with id {0} not found", commentDTO.commentId()));

    }

    private UUID findCommentIdParent(Comment commentToUpdate) {
        return commentToUpdate.getParentComments().get(0).getParentChildCommentId().getParentComment().getCommentId();
    }

    private boolean isNotNullEmptyAndBlank(String xAttribute) {
        if (xAttribute == null) return false;
        return !(xAttribute.isBlank()) || !(xAttribute.isEmpty());
    }


    @Override
    public UUID deleteComment(UUID commentId) {
        if (!commentRepository.existsById(commentId)) throw new NoSuchElementException(
                MessageFormat.format("Comment with id {0} not found", commentId));
        commentRepository.deleteByCommentId(commentId.toString());
        return commentId;
    }

    @Override
    public ObjectPagedList<?> getChildrenComments(UUID parentComment, Pageable pageable) {
        Page<ParentChildComment> childComments = parentChildCommentService.getChildrenCommentList(parentComment, pageable);
        log.info(MessageFormat.format("found {0}  child comment which is ", childComments.getTotalElements()));
        return new ObjectPagedList<>(
                childComments
                        .stream().map(commentMapper::commentToChildCommentDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        childComments.getPageable().getPageNumber(),
                        childComments.getPageable().getPageSize()
                ), childComments.getTotalElements());
    }

    @Override
    public CommentVoteId deleteVote(UUID userId, UUID commentId) {
        CommentVoteId commentVoteId = CommentVoteId.builder().userId(userId).commentId(commentId).build();
        if (commentVoteService.commentVoteExists(commentVoteId)) {
            commentVoteService.deleteCommentVote(userId, commentId);
            updateCommentVotes(commentId);
            return commentVoteId;
        }

        throw new NoSuchElementException(MessageFormat.
                format("Vote for comment with id {0} is not present", commentId));
    }

    @Override
    public CommentLikeDislikeDTO commentLikeOrDisliked(CommentLikeDislikeDTO likeDislikeDTO) {
        if (!commentRepository.existsById(likeDislikeDTO.commentId()))
            throw new NoSuchElementException(
                    MessageFormat.format("Comment with Id {0} does not exits", likeDislikeDTO.commentId()));
        if (!userService.userExists(likeDislikeDTO.userId()))
            throw new UsernameNotFoundException(
                    MessageFormat.format("Username with id {0} does not exists", likeDislikeDTO.userId()));

        CommentLikeDislikeDTO commentLikeDislikeDTO = commentVoteService.addCommentVote(likeDislikeDTO);
        updateCommentVotes(commentLikeDislikeDTO.commentId());
        return commentLikeDislikeDTO;
    }

    public void updateCommentVotes(UUID commentId) {
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        log.debug("check if it ever goes here");
        optionalComment.ifPresent(
                comment -> {
                    comment.setLikes(commentVoteService.countVotes(comment.getCommentId(), true));
                    comment.setDislikes(commentVoteService.countVotes(comment.getCommentId(), false));
                    commentRepository.save(comment);
                }
        );
    }

    @Override
    public boolean isCommentPresent(UUID commentId) {
        return commentRepository.existsById(commentId);
    }

    @Override
    public UUID reportComment(CommentReportDTO commentReportDTO) {
        return commentReportService.reportComment(commentReportDTO, commentRepository.findById(commentReportDTO.getCommentId()).orElseThrow(() ->
                new NoSuchElementException(MessageFormat.format("comment with id {0} not found", commentReportDTO.getCommentId()))
        ));
    }
}
