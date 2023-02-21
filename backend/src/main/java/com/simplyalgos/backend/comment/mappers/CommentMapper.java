package com.simplyalgos.backend.comment.mappers;

import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.comment.domains.ParentChildComment;
import com.simplyalgos.backend.comment.dto.ChildrenCommentRetrieval;
import com.simplyalgos.backend.comment.dto.CommentBasicDTO;
import com.simplyalgos.backend.comment.dto.CommentToSendDTO;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.dtos.UserDataDTO;
import com.simplyalgos.backend.utils.StringUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class CommentMapper {
    private final UserRepository userRepository;

    public CommentToSendDTO commentToChildCommentDTO(ParentChildComment parentChildComment) {
        CommentToSendDTO.CommentToSendDTOBuilder commentBasicDTOBuilder = CommentToSendDTO.builder();
        if (parentChildComment.getParentChildCommentId().getChildComment() != null) {
            if(parentChildComment.getParentComment() != null){
                commentBasicDTOBuilder.rootId(parentChildComment.getParentComment().getCommentId());
            }
            Comment currentComment = parentChildComment.getParentChildCommentId().getChildComment();
            commentBasicDTOBuilder
                    .comment(CommentBasicDTO.builder().createdBy(mapUserToUserDataDTO(currentComment.getCreatedBy()))
                            .createdDate(currentComment.getCreatedDate())
                            .commentId(currentComment.getCommentId())
                            .commentText(currentComment.getCommentText())
                            .dislikes(currentComment.getDislikes())
                            .likes(currentComment.getLikes())
                            .replyCount(countReplies(currentComment.getChildrenComments()))
                            .build());
        }
        return commentBasicDTOBuilder.build();
    }

    public CommentToSendDTO commentToCommentBasicDTO(Comment comment, UUID pageId) {
        return CommentToSendDTO
                .builder()
                .rootId(pageId)
                .comment(CommentBasicDTO.builder().commentId(comment.getCommentId())
                        .commentText(comment.getCommentText())
                        .createdDate(comment.getCreatedDate())
                        .createdBy(UserDataDTO.builder()
                                .userId(comment.getCreatedBy().getUserId())
                                .firstName(comment.getCreatedBy().getFirstName())
                                .lastName(comment.getCreatedBy().getLastName())
                                .profilePicture(comment.getCreatedBy().getProfilePicture())
                                .username(comment.getCreatedBy().getUsername())
                                .build())
                        .likes(comment.getLikes())
                        .dislikes(comment.getDislikes())
                        .replyCount(countReplies(comment.getChildrenComments())).build())
                .build();
    }

    public Integer countReplies(List<ParentChildComment> comments) {
        if (comments == null) return 0;
        return comments.size();
    }

    @Deprecated
    public ChildrenCommentRetrieval ParentChildCommentToChildrenCommentList(ParentChildComment parentChildComment) {
        ChildrenCommentRetrieval.ChildrenCommentRetrievalBuilder childrenComments = ChildrenCommentRetrieval.builder();
        List<CommentBasicDTO> commentBasicDTOS = new ArrayList<>();
        if (parentChildComment.getParentChildCommentId().getParentComment().getChildrenComments() != null) {
            List<ParentChildComment> currentChildren = parentChildComment.getParentChildCommentId().getParentComment().getChildrenComments();
            List<Comment> comments = currentChildren
                    .stream()
                    .map(currentChild -> currentChild
                            .getParentChildCommentId()
                            .getChildComment()).toList();
            commentBasicDTOS = comments.stream().map(comment -> CommentBasicDTO.builder()
                    .commentId(comment.getCommentId())
                    .commentText(comment.getCommentText())
                    .likes(comment.getLikes())
                    .dislikes(comment.getDislikes())
                    .createdDate(comment.getCreatedDate())
                    .createdBy(mapUserToUserDataDTO(comment.getCreatedBy())).build()).collect(Collectors.toList());

        }
        return childrenComments.childrenComments(commentBasicDTOS).build();
    }

    //later on check if it ever goes to the else statement
    private UserDataDTO mapUserToUserDataDTO(User createdBy) {
        UserDataDTO.UserDataDTOBuilder userToBuild = UserDataDTO.builder();
        if (createdBy != null) {
            if (createdBy.getUserId() != null) {
                userToBuild.userId(createdBy.getUserId());
                if (StringUtils.isNotNullAndEmptyOrBlank(createdBy.getUsername())) userToBuild.username(createdBy.getUsername());
                if (StringUtils.isNotNullAndEmptyOrBlank(createdBy.getFirstName()))
                    userToBuild.firstName(createdBy.getFirstName());
                if (StringUtils.isNotNullAndEmptyOrBlank(createdBy.getLastName())) userToBuild.lastName(createdBy.getLastName());
                if (StringUtils.isNotNullAndEmptyOrBlank((createdBy.getProfilePicture())))
                    userToBuild.profilePicture(createdBy.getProfilePicture());
            } else {
                Optional<User> user = userRepository.findById(UUID.fromString(createdBy.toString()));
                user.ifPresent(currUser -> userToBuild
                        .userId(currUser.getUserId())
                        .username(currUser.getUsername())
                        .profilePicture(currUser.getProfilePicture())
                        .lastName(currUser.getLastName()).
                        firstName(currUser.getFirstName()).build());
            }
        }
        return userToBuild.build();
    }
}
