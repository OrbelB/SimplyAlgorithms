package com.simplyalgos.backend.comment.dto;

import com.simplyalgos.backend.user.dtos.UserDataDTO;
import lombok.Builder;
import lombok.Data;


import java.util.UUID;

@Data
@Builder
public class CommentBasicDTO {
    UUID commentId;
    String commentText;
    String createdDate;
    Integer likes;
    Integer dislikes;
    UserDataDTO createdBy;
    Integer replyCount;
}
