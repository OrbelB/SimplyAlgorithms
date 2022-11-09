package com.simplyalgos.backend.comment.dto;

import java.util.UUID;

public record CommentDTO(
        UUID commentId,
        UUID pageId,
        String commentText,
        UUID userId
) {
}
