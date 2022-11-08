package com.simplyalgos.backend.page.dto;

import com.simplyalgos.backend.comment.dto.CommentBasicDTO;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.user.dtos.UserDataDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;
import java.util.UUID;
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class FullForumDTO {
    UUID pageId;
    String descriptionText;
    String title;
    String createdDate;
    String photo;
    String video;
    int upVotes;
    int downVotes;
    UserDataDTO userDto;
    Set<CommentBasicDTO> comments;
    Set<TagDTO> tags;

}
