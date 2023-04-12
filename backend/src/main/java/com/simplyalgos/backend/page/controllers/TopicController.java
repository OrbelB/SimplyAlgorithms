package com.simplyalgos.backend.page.controllers;

import com.simplyalgos.backend.comment.security.DeleteVotePermission;
import com.simplyalgos.backend.page.dtos.FullTopicDTO;
import com.simplyalgos.backend.page.dtos.LikeDislikeDTO;
import com.simplyalgos.backend.page.security.perms.CreateVotePermission;
import com.simplyalgos.backend.page.services.TopicService;
import com.simplyalgos.backend.page.services.WikiService;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.report.security.perms.CreateReportPermission;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@RequestMapping("topics")
@Slf4j
@CrossOrigin
@RestController
public class TopicController {

    private final TopicService topicService;

    private final WikiService wikiService;


    @GetMapping("/list")
    public ResponseEntity<?> listPages(@RequestParam(name = "page",  defaultValue = "0") Integer page,
                                       @RequestParam(name = "size",  defaultValue = "5") Integer size,
                                       @RequestParam(name = "sortBy", required = false) String sortBy) {
        if (!(sortBy == null)) {
            if (sortBy.equals("upVotes")) {
                return ResponseEntity.ok(topicService.listTopicPages(PageRequest.of(page, size, Sort.by(sortBy).descending())));

            }
            return ResponseEntity.ok(topicService.listTopicPages(PageRequest.of(page, size, Sort.by(sortBy).ascending())));
        }
        return ResponseEntity.ok(topicService.listTopicPages(PageRequest.of(page, size)));
    }

    @GetMapping("/{pageTitle}")
    public ResponseEntity<?> getSingleTopicPageByName(@PathVariable String pageTitle) {
        return ResponseEntity.ok(topicService.getTopicPage(pageTitle));
    }

    @PreAuthorize("hasAuthority('topic.create')")
    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<?> createForum(@RequestBody FullTopicDTO topic) {
        return ResponseEntity.status(HttpStatus.CREATED).body(topicService.createPage(topic));
    }

    @PreAuthorize("hasAuthority('topic.remove')")
    @DeleteMapping(path = "/delete")
    public ResponseEntity<?> deleteForum(@RequestParam(name = "userId") UUID userId,
                                         @RequestParam(name = "pageId") UUID pageId) {
        topicService.deleteTopicPage(pageId, userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PreAuthorize("hasAuthority('topic.update')")
    @PutMapping(path = "/update", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateForum(@RequestBody FullTopicDTO fullTopicDTO) {
        return ResponseEntity.accepted().body(topicService.updateTopicPage(fullTopicDTO));
    }

    @CreateVotePermission
    @PostMapping(path = "/vote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> likeOrDislike(@RequestBody LikeDislikeDTO likeDislikeDTO) {
        topicService.userLikedOrDisliked(likeDislikeDTO.userId(), likeDislikeDTO.pageId(), likeDislikeDTO.likeDislike());
        return ResponseEntity.accepted().body(topicService.userLikedOrDisliked(likeDislikeDTO.userId(), likeDislikeDTO.pageId(), likeDislikeDTO.likeDislike()));
    }

    //not working
    @GetMapping(path = "/list/by-type")
    public ResponseEntity<?> listByType(@RequestParam Integer page,
                                        @RequestParam Integer size,
                                        @RequestParam(name = "tagId") String tagId) {
        return ResponseEntity.ok(topicService.listTopicPagesByTags(UUID.fromString(tagId), PageRequest.of(page, size)));
    }

    @CreateReportPermission
    @GetMapping(path = "/report", consumes = "application/json")
    public ResponseEntity<?> reportForum(@RequestBody PageReportDTO pageReport) {

        return ResponseEntity.status(HttpStatus.CREATED).body(topicService.reportPage(pageReport));
    }

    @DeleteVotePermission
    @DeleteMapping(path = "/delete-vote")
    public ResponseEntity<?> deleteVote(@RequestParam(name = "userId") UUID userId,
                                        @RequestParam(name = "pageId") UUID pageId) {
        return ResponseEntity.ok(topicService.deleteVote(userId, pageId));
    }

    @GetMapping(path = "/list/votes")
    public ResponseEntity<?> listVotesByPageId(@RequestParam(name = "pageId") UUID pageId,
                                               @RequestParam(name = "userId") UUID userId) {
        return ResponseEntity.ok(topicService.listVotesByPageAndUserId(pageId, userId));
    }

    @GetMapping(path = "/list/available-pages", produces = "application/json")
    public ResponseEntity<?> listAvailablePages() {
        return ResponseEntity.ok(wikiService.getWikiTopicsBasicInfo());
    }

    @GetMapping(path ="name/available", produces = "application/json")
    public ResponseEntity<?> isNameAvailable(@RequestParam(name = "name") String name){
        return ResponseEntity.ok(topicService.isPageNameUnique(name.trim()));
    }


}
