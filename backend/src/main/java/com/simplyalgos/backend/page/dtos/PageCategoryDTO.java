package com.simplyalgos.backend.page.dtos;


import java.util.Set;
import java.util.UUID;

public class PageCategoryDTO {
    UUID tagId;
    String tag;
    Set<UUID> pageIds;
}
