package com.simplyalgos.backend.comment.services;


import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.comment.domains.CommentVoteId;
import com.simplyalgos.backend.comment.domains.ParentChildComment;
import com.simplyalgos.backend.comment.dto.ChildCommentDTO;
import com.simplyalgos.backend.comment.dto.CommentDTO;
import com.simplyalgos.backend.comment.dto.CommentLikeDislikeDTO;
import com.simplyalgos.backend.comment.dto.CommentToSendDTO;
import com.simplyalgos.backend.comment.enums.CommentType;
import com.simplyalgos.backend.comment.mappers.CommentMapper;
import com.simplyalgos.backend.comment.repositories.CommentRepository;
import com.simplyalgos.backend.comment.repositories.projections.CommentParent;
import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.page.domains.PageEntity;
import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.repositories.projection.ForumInformation;
import com.simplyalgos.backend.page.services.ForumService;
import com.simplyalgos.backend.page.services.PageEntityService;
import com.simplyalgos.backend.page.services.TopicService;
import com.simplyalgos.backend.report.dtos.CommentReportDTO;
import com.simplyalgos.backend.report.services.CommentReportService;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.services.DashboardService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.utils.StringUtils;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Internal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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

    @Override @Internal
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
    public ObjectPagedList<?> listParentCommentsByPageId(UUID pageId, Pageable pageable) {
        Page<CommentParent> parentComments = commentRepository
                .findAllByIsParentChildAndPageComment_pageId(
                        CommentType.PARENT.label,
                        pageId,
                        pageable,
                        CommentParent.class
                );
        return new ObjectPagedList<>(
                parentComments.stream().toList(),
                PageRequest.of(
                        parentComments.getPageable().getPageNumber(),
                        parentComments.getPageable().getPageSize()
                ), parentComments.getTotalElements());
    }

    @Override
    public CommentToSendDTO createParentComment(CommentDTO commentDTO) {
        log.debug(MessageFormat.format("The user id {0}", commentDTO.userId()));
        PageEntity page = pageEntityService.getPageEntity(commentDTO.pageId());

        if (page.getIsForumTopicPage().equals("forum")) {
            ForumInformation forumDTO = forumService.getForumPage(String.valueOf(page.getPageId()));
            dashboardService.addForumNotification(forumDTO, userService.getUser(forumDTO.getUserDto().getUserId()));
        }

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

    @Override
    public CommentToSendDTO createChildComment(ChildCommentDTO commentDTO) {

        User userToNotified = userService.getUser(getCommentById(commentDTO.getParentCommentId()).getCreatedBy().getUserId());
        PageEntity page = pageEntityService.getPageEntity(commentDTO.getChildComment().pageId());

        if (page.getIsForumTopicPage().equals("topic")) {
            Topic fullTopicDTO = topicService.getTopic(page.getPageId());
            dashboardService.addTopicNotification(fullTopicDTO, userToNotified);
        } else if (page.getIsForumTopicPage().equals("forum")) {
            ForumInformation forumDTO = forumService.getForumPage(String.valueOf(page.getPageId()));
            dashboardService.addForumNotification(forumDTO, userToNotified);
        }

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

    protected Comment getCommentById(UUID commentId) {
        return commentRepository.findById(commentId)
                .orElseThrow(() ->
                        new ElementNotFoundException("Comment has been deleted or never created"));
    }



    @Override
    public CommentToSendDTO updateComment(CommentDTO commentDTO) {
        Comment commentToUpdate = commentRepository
                .findById(commentDTO.commentId())
                .orElseThrow(() -> new NoSuchElementException(
                        MessageFormat.format("Comment with id {0} not found",
                                commentDTO.commentId())));


        if (StringUtils.isNotNullAndEmptyOrBlank(commentDTO.commentText())) {
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

    private UUID findCommentIdParent(Comment commentToUpdate) {
        return commentToUpdate.getParentComments().get(0).getParentChildCommentId().getParentCommentId();
    }

    @Override
    public UUID deleteComment(UUID commentId) {
        if (!commentRepository.existsById(commentId)) throw new NoSuchElementException(
                MessageFormat.format("Comment with id {0} not found", commentId));
        commentRepository.deleteByCommentId(commentId.toString());
        return commentId;
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
        return commentReportService.reportComment(commentReportDTO,
                commentRepository.findById(commentReportDTO.getCommentId())
                        .orElseThrow(() ->
                new NoSuchElementException(
                        MessageFormat.format("comment with id {0} not found", commentReportDTO.getCommentId())
                )
        ));
    }
}
