package com.simplyalgos.backend.page.dtos;

import java.util.UUID;

public record LikeDislikeDTO(
        UUID userId,
        UUID pageId,
        boolean likeDislike
) {
}
