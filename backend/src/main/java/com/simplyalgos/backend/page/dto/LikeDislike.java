package com.simplyalgos.backend.page.dto;

import java.util.UUID;

public record LikeDislike(
        UUID userId,
        UUID pageId,
        boolean likeDislike
) {
}
