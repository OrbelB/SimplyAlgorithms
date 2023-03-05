package com.simplyalgos.backend.page.dtos;

import java.util.UUID;

public record WikiInfo(
        UUID wikiId,
        String wikiName
) {
}
