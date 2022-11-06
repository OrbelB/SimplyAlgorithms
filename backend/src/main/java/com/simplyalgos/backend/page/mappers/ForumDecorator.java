package com.simplyalgos.backend.page.mappers;

import com.simplyalgos.backend.comment.Comment;
import com.simplyalgos.backend.comment.dto.CommentBasicDTO;
import com.simplyalgos.backend.page.Forum;
import com.simplyalgos.backend.page.dto.ForumDTO;
import com.simplyalgos.backend.page.dto.FullForumDTO;
import com.simplyalgos.backend.tag.Tag;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.user.User;
import com.simplyalgos.backend.user.dtos.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.HashSet;
import java.util.Set;


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
        return forumDTO;
    }

    private UserDTO mapUserToUserDto(Forum forum) {
        User user = forum.getCreatedBy();
        UserDTO.UserDTOBuilder userDTOBuilder = UserDTO.builder();
        userDTOBuilder.userId(user.getUserId())
                .username(user.getUsername())
                .profilePicture(user.getProfilePicture());
        return userDTOBuilder.build();
    }

    @Override
    public Forum forumDTOToForum(ForumDTO forumDTO) {
        return forumMapper.forumDTOToForum(forumDTO);
    }

    @Override
    public FullForumDTO forumToFullForumDto(Forum forum) {
        FullForumDTO forumDTO = forumMapper.forumToFullForumDto(forum);
        forumDTO.setPageId(forum.getPageId());
        if (forum.getCreatedBy() != null) {
            forumDTO.setUserDto(mapUserToUserDto(forum));
        }

        if (forum.getPageEntityId().getPageComments() != null) {
            forumDTO.setComments(mapCommentToCommentBasicDto(forum));
        }


        if (forum.getPageEntityId().getTags() != null) {
            forumDTO.setTags(mapTagsToTagsDto(forum));
        }


        return forumDTO;

    }

    private Set<TagDTO> mapTagsToTagsDto(Forum forum) {
        Set<Tag> tags = forum.getPageEntityId().getTags();
        Set<TagDTO> commentBasicDTOS = new HashSet<>();
        tags.forEach(tag -> commentBasicDTOS.add(
                TagDTO.builder()
                        .tagId(tag.getTagId())
                        .tag(tag.getTag()).
                        build())
        );
        return commentBasicDTOS;
    }

    //get comments from forum page
    private Set<CommentBasicDTO> mapCommentToCommentBasicDto(Forum forum) {
        Set<Comment> comments = forum.getPageEntityId().getPageComments();
        Set<CommentBasicDTO> commentBasicDTOS = new HashSet<>();
        comments.forEach(comment -> commentBasicDTOS.add(
                CommentBasicDTO
                        .builder()
                        .commentId(comment.getCommentId())
                        .commentText(comment.getCommentText())
                        .createdDate(comment.getCreatedDate())
                        .build())
        );
        return commentBasicDTOS;
    }


}
