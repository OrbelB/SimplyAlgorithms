package com.simplyalgos.backend.page;

import com.simplyalgos.backend.page.dto.FullTopicDTO;
import com.simplyalgos.backend.page.dto.LikeDislikeDTO;
import com.simplyalgos.backend.page.security.perms.CreateVotePermission;
import com.simplyalgos.backend.report.dtos.PageReportDTO;
import com.simplyalgos.backend.report.security.perms.CreateReportPermission;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.UUID;

@AllArgsConstructor
@RequestMapping("topics")
@Slf4j
@CrossOrigin
@RestController
public class TopicController {

    private final TopicService topicService;


    @GetMapping("/list")
    public ResponseEntity<?> listPages(@RequestParam(name = "page", required = true, defaultValue = "0") Integer page,
                                       @RequestParam(name = "size", required = true, defaultValue = "5") Integer size,
                                       @RequestParam(name = "sortBy", required = false) String sortBy) {
        if(!(sortBy == null)) {
            if(sortBy.equals("upVotes")){
                return ResponseEntity.ok(topicService.listTopicPages(PageRequest.of(page, size, Sort.by(sortBy).descending())));

            }
            return ResponseEntity.ok(topicService.listTopicPages(PageRequest.of(page, size, Sort.by(sortBy).ascending())));
        }
        return ResponseEntity.ok(topicService.listTopicPages(PageRequest.of(page, size)));
    }

    @GetMapping("/{pageId}")
    public ResponseEntity<?> getSingleTopicPage(@PathVariable UUID pageId){
        return ResponseEntity.ok(topicService.getTopicPage(pageId));
    }

    @PreAuthorize("hasAuthority('topic.create')")
    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<?> createForum(@RequestBody FullTopicDTO fullTopicDTO) {
        topicService.createPage(fullTopicDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PreAuthorize("hasAuthority('topic.delete')")
    @DeleteMapping(path = "/delete")
    public ResponseEntity<?> deleteForum(@RequestParam(name = "userId", required = true) UUID userId,
                                         @RequestParam(name = "pageId", required = true) UUID pageId) {
        log.info(MessageFormat.format("this is userId {0}, and this is pageId {1} ", userId, pageId));
        topicService.deleteTopicPage(pageId, userId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PreAuthorize("hasAuthority('topic.update')")
    @PutMapping(path = "/update", consumes = "application/json")
    public ResponseEntity<?> updateForum(@RequestBody FullTopicDTO fullTopicDTO){
        topicService.updateTopicPage(fullTopicDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @CreateVotePermission
    @GetMapping(path = "/like-dislike", consumes = "application/json")
    public ResponseEntity<?> likeOrDislike(@RequestBody LikeDislikeDTO likeDislikeDTO) {
        log.info(MessageFormat.format("userid {0}, pageId {1}, likeDislikeDTO {2}",
                likeDislikeDTO.userId(),
                likeDislikeDTO.pageId(),
                likeDislikeDTO.likeDislike()));
        topicService.userLikedOrDisliked(likeDislikeDTO.userId(), likeDislikeDTO.pageId(), likeDislikeDTO.likeDislike());
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    //not working
    @GetMapping(path = "/list/by-type")
    public ResponseEntity<?> listByType(@RequestParam Integer page,
                                        @RequestParam Integer size,
                                        @RequestParam(name="tagId") String tagId){
        return ResponseEntity.ok(topicService.listTopicPagesByTags(UUID.fromString(tagId), PageRequest.of(page, size)));
    }

    @CreateReportPermission
    @GetMapping(path = "/report", consumes = "application/json")
    public ResponseEntity<?> reportForum(@RequestBody PageReportDTO pageReport) {
        topicService.reportPage(pageReport);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
