package com.simplyalgos.backend.comment;

import com.simplyalgos.backend.comment.dto.ChildCommentDTO;
import com.simplyalgos.backend.comment.dto.CommentDTO;
import com.simplyalgos.backend.comment.dto.CommentLikeDislikeDTO;
import com.simplyalgos.backend.comment.security.CreateCommentPermission;
import com.simplyalgos.backend.comment.security.DeleteCommentPermission;
import com.simplyalgos.backend.comment.security.DeleteVotePermission;
import com.simplyalgos.backend.comment.security.UpdateCommentPermission;
import com.simplyalgos.backend.page.security.perms.CreateVotePermission;
import com.simplyalgos.backend.user.dtos.CommentReportDTO;
import com.simplyalgos.backend.report.security.perms.CreateReportPermission;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("comments")
@RestController
public class CommentController {

    private final CommentService commentService;

    private final CommentVoteService commentVoteService;
    @GetMapping(path = "/list")
    public ResponseEntity<?> listComments(@RequestParam(name = "page", required = true, defaultValue = "0") Integer page,
                                          @RequestParam(name = "size", required = true, defaultValue = "5") Integer size) {
        return ResponseEntity.ok(commentService.listComments(PageRequest.of(page, size)));
    }

    @GetMapping(path = "/list-child-comments")
    public ResponseEntity<?> listChildComments(@RequestParam(name = "page", required = true, defaultValue = "0") Integer page,
                                               @RequestParam(name = "size", required = true, defaultValue = "5") Integer size,
                                               @RequestParam(name = "parentCommentId", required = false) UUID parentComment) {
        return ResponseEntity.ok(commentService.getChildrenComments(parentComment, PageRequest.of(page, size)));
    }


    @CreateCommentPermission
    @PostMapping(path = "/create-parent-comment", consumes = "application/json")
    public ResponseEntity<?> createParentComment(@RequestBody CommentDTO commentDTO) {
        log.info("id of user is" + commentDTO.userId());
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createParentComment(commentDTO));
    }

    @CreateCommentPermission
    @PostMapping(path = "/create-child-comment", consumes = "application/json")
    public ResponseEntity<?> createChildComment(@RequestBody ChildCommentDTO commentDTO) {
        ;
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createChildComment(commentDTO));
    }


    //checks if the id of the creator matches with the current user authenticated before performing any logic
    @UpdateCommentPermission
    @PutMapping(path = "/update", consumes = "application/json")
    public ResponseEntity<?> updateComment(@RequestBody CommentDTO commentDTO) {
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(commentService.updateComment(commentDTO));
    }

    @DeleteCommentPermission
    @DeleteMapping(path = "/delete")
    public ResponseEntity<?> deleteComment(@RequestParam(name = "userId") String userId, @RequestParam(name = "commentId") UUID commentId) {
        log.info(MessageFormat.format("userId IS {0}", userId));
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(commentService.deleteComment(commentId));
    }

    @CreateVotePermission
    @PutMapping(path = "/vote", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> voteComment(@RequestBody CommentLikeDislikeDTO commentLikeDislikeDTO) {

        return ResponseEntity.accepted().body(commentService.commentLikeOrDisliked(commentLikeDislikeDTO));
    }

    @CreateReportPermission
    @PostMapping(path = "/report", consumes = "application/json",produces = "application/json")
    public ResponseEntity<?> reportComment(@RequestBody CommentReportDTO commentReportDTO) {
        log.debug(MessageFormat.format("comment id is {0}", commentReportDTO.getCommentId()));
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.reportComment(commentReportDTO));
    }


    @DeleteVotePermission
    @DeleteMapping(path = "/delete-vote")
    public ResponseEntity<?> deleteVote(@RequestParam(name = "userId") UUID userId,
                                        @RequestParam(name = "commentId") UUID commentId) {
        return ResponseEntity.accepted().body(commentService.deleteVote(userId, commentId));
    }


    @GetMapping(path = "/list/votes")
    public ResponseEntity<?> listVotesByCommentId(@RequestParam(name = "pageId") UUID pageId) {
        return ResponseEntity.ok(commentVoteService.listVotesByPage(pageId));
    }





}
