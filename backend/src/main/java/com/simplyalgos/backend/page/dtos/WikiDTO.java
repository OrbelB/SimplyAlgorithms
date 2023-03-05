package com.simplyalgos.backend.page.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Map;
import java.util.Set;
import java.util.UUID;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WikiDTO {

    UUID wikiId;
    @NotNull
    String wikiName;
    Map<String, Object> description;

    Set<UUID> pageIds;

    Set<UUID> wikiIds;

}
