package com.simplyalgos.backend.page.controllers;


import com.simplyalgos.backend.page.dtos.WikiDTO;
import com.simplyalgos.backend.page.services.WikiService;
import io.swagger.v3.core.util.Json;
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

    @GetMapping("/list")
    public ResponseEntity<?> getWikiMainCategories() {
        return ResponseEntity.ok(wikiService.getWikiMainCategories());
    }

    @GetMapping("/{wikiName}")
    public ResponseEntity<?> getWikiByName(@PathVariable String wikiName) {
        return ResponseEntity.ok(wikiService.getWiki(wikiName));
    }

    @GetMapping("/list/available")
    public ResponseEntity<?> getAvailableWikis() {
        return ResponseEntity.ok(wikiService.getAvailableWikis());
    }

    @PreAuthorize("hasRole(T(com.simplyalgos.backend.user.enums.UserRoles).ADMIN.name())")
    @PostMapping(value = "/create", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createWikiMainCategory(@RequestBody WikiDTO wiki) {
        log.info("check object "  + Json.pretty(wiki));
        return ResponseEntity.status(HttpStatus.CREATED).body(wikiService.saveWiki(wiki));
    }

    @PreAuthorize("hasRole(T(com.simplyalgos.backend.user.enums.UserRoles).ADMIN.name())")
    @PutMapping(value = "/update", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateWikiMainCategory(@RequestBody WikiDTO wiki) {
        log.info("check object "  + Json.pretty(wiki));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(wikiService.updateWiki(wiki));
    }


    @GetMapping(path = "name/available")
    public ResponseEntity<?> isWikiNameAvailable(@RequestParam String name) {
        return ResponseEntity.ok(wikiService.isWikiNameAvailable(name));
    }

    @PreAuthorize("hasRole(T(com.simplyalgos.backend.user.enums.UserRoles).ADMIN.name())")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteWiki(@RequestParam(name = "wikiId") UUID wikiId) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(wikiService.deleteWiki(wikiId));
    }
}
