package com.simplyalgos.backend.page.dto;

import java.util.UUID;

public record LikeDislikeDTO(
        UUID userId,
        UUID pageId,
        boolean likeDislike
) {
}
