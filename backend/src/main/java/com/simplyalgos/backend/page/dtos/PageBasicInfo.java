package com.simplyalgos.backend.page.dtos;

import java.util.UUID;

public record PageBasicInfo(
        UUID pageId,
        String title

) {
}
