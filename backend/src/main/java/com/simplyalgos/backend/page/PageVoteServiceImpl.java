package com.simplyalgos.backend.page;

import com.simplyalgos.backend.page.dto.LikeDislikeDTO;
import com.simplyalgos.backend.page.mappers.PageVoteMapper;
import com.simplyalgos.backend.user.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Slf4j
public class PageVoteServiceImpl implements PageVoteService {
    private final PageVoteRepository pageVoteRepository;
    private final PageVoteMapper pageVoteMapper;
    private final PageEntityService pageEntityService;

    private final UserService userService;

    @Override
    public LikeDislikeDTO addPageVote(LikeDislikeDTO likeDislikeDTO) {
        Optional<PageVote> optionalPageVote = pageVoteRepository.findByPageVoteId(
                PageVoteId
                        .builder()
                        .pageId(likeDislikeDTO.pageId())
                        .userId(likeDislikeDTO.userId())
                        .build()
        );
        PageVote pageVote;
        if (optionalPageVote.isPresent()) {
            pageVote = optionalPageVote.get();
            pageVote.setLike_dislike(likeDislikeDTO.likeDislike());
            return pageVoteMapper.pageVoteToPageVoteDTO(pageVoteRepository.save(pageVote));
        }
        //check if the like or dislike exists
        return pageVoteMapper.pageVoteToPageVoteDTO(pageVoteRepository //create the new user vote
                .save(PageVote.builder()
                        .like_dislike(likeDislikeDTO.likeDislike())
                        .pageEntity(pageEntityService.getPageEntity(likeDislikeDTO.pageId()))
                        .user(userService.getUser(likeDislikeDTO.userId()))
                        .pageVoteId(
                                PageVoteId
                                        .builder()
                                        .userId(likeDislikeDTO.userId())
                                        .pageId(likeDislikeDTO.pageId())
                                        .build()
                        ).build()
                )
        );
    }

    @Override
    public Integer countVotes(UUID pageId, boolean vote) {
        return pageVoteRepository.countLikeDislikeByPage(pageId.toString(), vote).orElse(0);
    }

    @Override
    public void deletePageVote(UUID userId, UUID pageId) {
        pageVoteRepository.deleteById(PageVoteId.builder().pageId(pageId).userId(userId).build());
    }

    @Override
    public boolean pageVoteExists(PageVoteId pageVoteId) {
        return pageVoteRepository.existsById(pageVoteId);
    }

    @Override
    public Set<?> listVotesByPage(UUID pageId) {
        return pageVoteRepository.findAllByPageVoteId_PageId(pageId)
                .stream()
                .map(pageVoteMapper::pageVoteToPageVoteDTO)
                .collect(Collectors.toSet());
    }
}
