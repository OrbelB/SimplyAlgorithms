package com.simplyalgos.backend.page.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;

import java.util.Set;
import java.util.UUID;

public record WikiDTO(

        UUID wikiId,

        @NotNull
        String wikiName,


        @JsonProperty("description")
        @NotNull
        String description,

        Set<UUID> pageIds
) {
}
