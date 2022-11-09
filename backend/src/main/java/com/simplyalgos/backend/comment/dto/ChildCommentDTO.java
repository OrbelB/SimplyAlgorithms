package com.simplyalgos.backend.comment.dto;

import lombok.*;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ChildCommentDTO {
    UUID parentCommentId;
    CommentDTO childComment;
}
