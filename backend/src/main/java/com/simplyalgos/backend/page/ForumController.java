package com.simplyalgos.backend.page;

import com.simplyalgos.backend.page.dto.ForumDTO;
import com.simplyalgos.backend.page.dto.LikeDislikeDTO;
import com.simplyalgos.backend.page.security.perms.CreateForumPermission;
import com.simplyalgos.backend.page.security.perms.CreateVotePermission;
import com.simplyalgos.backend.page.security.perms.DeleteForumPermission;
import com.simplyalgos.backend.page.security.perms.UpdateForumPermission;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.report.security.perms.CreateReportPermission;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.UUID;

@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("forums")
@Slf4j
@RestController
public class ForumController {
    private final ForumService forumService;

    @GetMapping("/list")
    public ResponseEntity<?> getPageList(@RequestParam(name = "page", required = true, defaultValue = "0") Integer page,
                                         @RequestParam(name = "size", required = true, defaultValue = "5") Integer size,
                                         @RequestParam(name = "sortBy", required = false) String sortBy) {
        if(sortBy != null) {
            if(sortBy.equals("upVotes") || sortBy.equals("createdDate")){
                return ResponseEntity.ok(forumService.listForumPages(PageRequest.of(page, size, Sort.by(sortBy).descending())));
            }
            return ResponseEntity.ok(forumService.listForumPages(PageRequest.of(page, size, Sort.by(sortBy).ascending())));
        }
        return ResponseEntity.ok(forumService.listForumPages(PageRequest.of(page, size)));
    }

    @GetMapping("/{pageId}")
    public ResponseEntity<?> getForum(@PathVariable String pageId) {
        log.info(MessageFormat.format("page requested is {0}", pageId));
        return ResponseEntity.ok(forumService.getForumPage(pageId));
    }

    @CreateForumPermission
    @PostMapping(path = "/create", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> createForum(@RequestBody ForumDTO forumDTO) {
        log.info("this is the object data " + forumDTO.getUserDto().getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(forumService.createForum(forumDTO));
    }

    @UpdateForumPermission
    @PutMapping(path = "/update", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateForum(@RequestBody ForumDTO forumDTO) {
        return ResponseEntity.accepted().body(forumService.updateForum(forumDTO));
    }


    @DeleteForumPermission
    @DeleteMapping(path = "/delete", produces = "application/json")
    public ResponseEntity<?> deleteForum(@RequestParam(name = "userId", required = true) String userId,
                                         @RequestParam(name = "pageId", required = true) String pageId) {
        log.info(MessageFormat.format("this is userId {0}, and this is pageId {1} ", userId, pageId));
        return ResponseEntity.accepted().body(forumService.deleteForum(pageId, userId));
    }

    @CreateVotePermission
    @PostMapping(path = "/like-dislike", consumes = "application/json")
    public ResponseEntity<?> likeOrDislike(@RequestBody LikeDislikeDTO likeDislikeDTO) {
        log.info(MessageFormat.format("userid {0}, pageId {1}, likeDislikeDTO {2}",
                likeDislikeDTO.userId(),
                likeDislikeDTO.pageId(),
                likeDislikeDTO.likeDislike()));
        forumService.userLikedOrDisliked(likeDislikeDTO.userId(), likeDislikeDTO.pageId(), likeDislikeDTO.likeDislike());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @CreateReportPermission
    @GetMapping(path = "/report", consumes = "application/json")
    public ResponseEntity<?> reportForum(@RequestBody PageReportDTO pageReport) {
        log.debug(MessageFormat.format("report comment id {0}" , pageReport.getPageId()));
        forumService.reportForum(pageReport);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping(path = "/list/by-category")
    public ResponseEntity<?> listByCategories(@RequestParam Integer page,
                                              @RequestParam Integer size,
                                              @RequestParam(name="tagId") String tagId
                                              ){
        return ResponseEntity.ok(forumService.listForumPagesByTags(UUID.fromString(tagId), PageRequest.of(page, size)));
    }
}
