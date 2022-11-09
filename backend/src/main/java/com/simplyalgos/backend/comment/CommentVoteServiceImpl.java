package com.simplyalgos.backend.comment;


import com.simplyalgos.backend.comment.dto.CommentLikeDislikeDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class CommentVoteServiceImpl implements CommentVoteService {

    private final CommentVoteRepository commentVoteRepository;

    @Override
    public void addCommentVote(CommentLikeDislikeDTO commentLikeDislikeDTO) {
        Optional<CommentVote> optionalCommentVote = commentVoteRepository.findById(
                CommentVoteId.builder()
                        .commentId(commentLikeDislikeDTO.commentId())
                        .userId(commentLikeDislikeDTO.userId()).
                        build()
        );
        //if the comment exists revert the like otherwise, create a new like
        optionalCommentVote.ifPresentOrElse(commentVote -> {
                    commentVote.setVote(commentLikeDislikeDTO.likeDislike());
                    commentVoteRepository.save(commentVote);
                },
                () -> commentVoteRepository.save(
                        CommentVote.builder().commentVoteId(CommentVoteId
                                .builder()
                                .commentId(commentLikeDislikeDTO.commentId())
                                .userId(commentLikeDislikeDTO.userId())
                                .build())
                                .like_dislike(commentLikeDislikeDTO.likeDislike()).build()
                )
        );
    }

    public Integer countVotes(UUID commentID, boolean vote) {
        return commentVoteRepository.countAllByCommentVoteId_CommentIdAndVoteIs(commentID, vote);
    }
}
