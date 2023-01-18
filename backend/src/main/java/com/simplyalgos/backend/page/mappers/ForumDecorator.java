package com.simplyalgos.backend.page.mappers;

import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.comment.dto.CommentBasicDTO;
import com.simplyalgos.backend.comment.enums.CommentType;
import com.simplyalgos.backend.page.domains.Forum;
import com.simplyalgos.backend.page.dtos.ForumDTO;
import com.simplyalgos.backend.page.dtos.FullForumDTO;
import com.simplyalgos.backend.tag.domains.Tag;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.UserDataDTO;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.lang.NonNull;


import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public class ForumDecorator implements ForumMapper {

    private ForumMapper forumMapper;

    @Autowired
    @Qualifier("delegate")
    public void setForumDecorator(ForumMapper forumMapper) {
        this.forumMapper = forumMapper;
    }

    @Override
    public ForumDTO forumToForumDTO(Forum forum) {
        ForumDTO forumDTO = forumMapper.forumToForumDTO(forum);
        forumDTO.setPageId(forum.getPageId());
        if ((forum.getCreatedBy()) != null) {
            forumDTO.setUserDto(mapUserToUserDto(forum));
        }

        if (forum.getPageEntityId().getTags() != null) {
            forumDTO.setTags(mapTagsToTagsDto(forum));
        }
        return forumDTO;
    }

    private UserDataDTO mapUserToUserDto(Forum forum) {
        User user = forum.getCreatedBy();
        UserDataDTO.UserDataDTOBuilder userDTOBuilder = UserDataDTO.builder();
        userDTOBuilder.userId(user.getUserId())
                .username(user.getUsername())
                .profilePicture(user.getProfilePicture())
                .lastName(user.getLastName())
                .firstName(user.getFirstName());
        return userDTOBuilder.build();
    }

    @Override
    public Forum forumDTOToForum(ForumDTO forumDTO) {
        return forumMapper.forumDTOToForum(forumDTO);
    }

    @Override
    public FullForumDTO forumToFullForumDto(@NonNull Forum forum) {
        FullForumDTO forumDTO = forumMapper.forumToFullForumDto(forum);
        forumDTO.setPageId(forum.getPageId());
        if (forum.getCreatedBy() != null) {
            forumDTO.setUserDto(mapUserToUserDto(forum));
        }
        if (forum.getPageEntityId() != null) {
            if (forum.getPageEntityId().getPageComments() != null) {
                forumDTO.setComments(mapCommentToCommentBasicDto(forum, forumDTO));
            }
            if (forum.getPageEntityId().getTags() != null) {
                forumDTO.setTags(mapTagsToTagsDto(forum));
            }
        }

        return forumDTO;

    }


    private Set<TagDTO> mapTagsToTagsDto(Forum forum) {
        Set<Tag> tags = forum.getPageEntityId().getTags();
        return tags.stream().map(tag ->
                        TagDTO.builder()
                                .tagId(tag.getTagId())
                                .tag(tag.getTag()).
                                build())
                .collect(Collectors.toSet());
    }

    //get comments from forum page
    private Set<CommentBasicDTO> mapCommentToCommentBasicDto(Forum forum, FullForumDTO fullForumDTO) {
        Set<Comment> comments = forum.getPageEntityId().getPageComments();
        return comments.stream().filter(comment -> comment.getIsParentChild().equals(CommentType.PARENT.label)).map(comment ->
                CommentBasicDTO
                        .builder()
                        .commentId(comment.getCommentId())
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
                        .replyCount(comment.getChildrenComments().size())
                        .build()
        ).collect(Collectors.toSet());
    }
}
