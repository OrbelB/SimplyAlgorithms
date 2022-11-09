package com.simplyalgos.backend.comment.dto;

import java.util.UUID;

public record CommentLikeDislikeDTO(
        UUID commentId,
        UUID userId,
        boolean likeDislike
) {
}
