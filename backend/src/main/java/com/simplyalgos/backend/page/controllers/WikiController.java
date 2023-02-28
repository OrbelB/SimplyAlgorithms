package com.simplyalgos.backend.page.controllers;


import com.simplyalgos.backend.page.dtos.WikiDTO;
import com.simplyalgos.backend.page.services.WikiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("wiki")
@RestController
public class WikiController {

    private final WikiService wikiService;

    @GetMapping("/mainCategories")
    public ResponseEntity<?> getWikiMainCategories() {
        return ResponseEntity.ok(wikiService.getWikiMainCategories());
    }
    @GetMapping("/{wikiId}")
    public ResponseEntity<?> getWiki(@PathVariable UUID wikiId) {
        return ResponseEntity.ok(wikiService.getWikiTopics(wikiId));
    }

    @PreAuthorize("hasRole(T(com.simplyalgos.backend.user.enums.UserRoles).ADMIN.name())")
    @PostMapping("/category/create")
    public ResponseEntity<?> createWikiMainCategory(WikiDTO wiki) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(wikiService.saveWikiMainCategory(wiki));
    }
}
