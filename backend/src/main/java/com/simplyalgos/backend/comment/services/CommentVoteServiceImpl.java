package com.simplyalgos.backend.comment.services;


import com.simplyalgos.backend.comment.repositories.CommentRepository;
import com.simplyalgos.backend.comment.repositories.CommentVoteRepository;
import com.simplyalgos.backend.comment.domains.CommentVote;
import com.simplyalgos.backend.comment.domains.CommentVoteId;
import com.simplyalgos.backend.comment.dto.CommentLikeDislikeDTO;
import com.simplyalgos.backend.comment.mappers.CommentVoteMapper;
import com.simplyalgos.backend.user.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentVoteServiceImpl implements CommentVoteService {

    private final CommentVoteRepository commentVoteRepository;

    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final CommentVoteMapper commentVoteMapper;

    @Override
    public CommentLikeDislikeDTO addCommentVote(CommentLikeDislikeDTO commentLikeDislikeDTO) {
        Optional<CommentVote> optionalCommentVote = commentVoteRepository.findById(
                CommentVoteId.builder()
                        .commentId(commentLikeDislikeDTO.commentId())
                        .userId(commentLikeDislikeDTO.userId()).
                        build()
        );
        CommentVote commentVote;
        if(optionalCommentVote.isPresent()){
            commentVote = optionalCommentVote.get();
            commentVote.setVote(commentLikeDislikeDTO.likeDislike());
           CommentLikeDislikeDTO commentLikeDislikeDTO1 = commentVoteMapper.comentVoteToCommentVoteDTO(commentVoteRepository.save(commentVote));
           log.info(MessageFormat.format("This is the freshly added comment created {0} {1}" , commentLikeDislikeDTO1.commentId(), commentLikeDislikeDTO1.userId()));
            return commentLikeDislikeDTO1;
        }
        return commentVoteMapper.comentVoteToCommentVoteDTO(commentVoteRepository.save(
                CommentVote.builder().commentVoteId(CommentVoteId
                                .builder()
                                .commentId(commentLikeDislikeDTO.commentId())
                                .userId(commentLikeDislikeDTO.userId())
                                .build())
                        .like_dislike(commentLikeDislikeDTO.likeDislike())
                        .commentVoteReference(commentRepository.findById(commentLikeDislikeDTO.commentId()).get())
                        .userVoteReference(userRepository.findById(commentLikeDislikeDTO.userId()).get())
                        .build()));
    }


    public Integer countVotes(UUID commentID, boolean vote) {
        Integer value = commentVoteRepository.countAllByCommentVoteId_CommentIdAndVoteIs(commentID, vote);
        log.debug("Current Count of votes " + value);
        return value == null ? 0 : value;
    }

    @Override
    public void deleteCommentVote(UUID userId, UUID commentId) {
        commentVoteRepository.deleteCommentVote(userId.toString(), commentId.toString());
    }


    @Override
    public boolean commentVoteExists(CommentVoteId commentVoteId) {
        return commentVoteRepository.existsById(commentVoteId);
    }

    @Override
    public Set<?> listVotesByPage(UUID pageId) {
        return commentVoteRepository
                .findAllByCommentVoteReference_PageComment_PageId(pageId)
                .stream()
                .map(commentVoteMapper::comentVoteToCommentVoteDTO)
                .collect(Collectors.toSet());
    }

}
