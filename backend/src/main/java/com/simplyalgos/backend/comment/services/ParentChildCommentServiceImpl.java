package com.simplyalgos.backend.comment.services;

import com.simplyalgos.backend.comment.domains.Comment;
import com.simplyalgos.backend.comment.repositories.ParentChildCommentRepository;
import com.simplyalgos.backend.comment.repositories.projections.CommentChild;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ParentChildCommentServiceImpl implements ParentChildCommentService {
    private final ParentChildCommentRepository parentChildCommentRepository;

    @Override
    public void createParentChildMapping(Comment childComment, UUID parentCommentId) {
        parentChildCommentRepository.createChildParentMapping(parentCommentId.toString(), childComment.getCommentId().toString());
    }

    @Override
    public Page<CommentChild> getChildrenCommentList(UUID parentComment, Pageable pageable) {
        log.debug("parentComment: " + parentComment);
        return parentChildCommentRepository
                .findAllByParentChildCommentId_ParentCommentId(parentComment, pageable, CommentChild.class);
    }
}
