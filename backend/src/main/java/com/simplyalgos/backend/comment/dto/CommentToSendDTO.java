package com.simplyalgos.backend.comment.dto;

import lombok.*;

import java.util.UUID;

@Data
@Builder
public class CommentToSendDTO {
    UUID rootId;
    CommentBasicDTO comment;
}
