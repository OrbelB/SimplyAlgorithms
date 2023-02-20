package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.Quiz;
import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.quiz.repositories.QuizRepository;
import com.simplyalgos.backend.tag.domains.Tag;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.tag.repositories.TagRepository;
import com.simplyalgos.backend.tag.services.TagService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.sql.Timestamp;
import java.text.MessageFormat;
import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class QuizServiceImp implements QuizService {

    private final QuizRepository quizRepository;
    private final UserService userService;
    private final TagService tagService;

    private final TagRepository tagRepository;
    @Override
    public ObjectPagedList<?> listQuizPages(org.springframework.data.domain.Pageable pageable) { //why must i do this? why?
        Page<Quiz> quizPage = quizRepository.findAll(pageable);
        return null;
    }

    @Override
    public ObjectPagedList listQuizPageWithTag(Pageable pageable, String tag) {
        return null;
    }

    @Override
    public UUID createQuiz(QuizDTO quizDTO) {
        log.debug("Creating a new Quiz");
        Tag quizTag = null;
        Date createdDate = new Date();
        if(quizDTO.getTag().getTagId() == null){
//            will create the tag if it's new
            quizTag = Tag.builder()
                    .tag(quizDTO.getTag().getTag())
                    .tagId(UUID.randomUUID())
                    .build();
            tagRepository.saveAndFlush(quizTag);
            log.debug("Creating a new Tag tagId: ", quizTag.getTagId());

        }
        else{
            quizTag = tagRepository.findById(quizDTO.getTag().getTagId()).get();
            log.debug("Tag already exists tagId: ", quizTag.getTagId());
        }
        Quiz newQuiz = Quiz.builder()
                .quizId(UUID.randomUUID())
                .createdDate(new Timestamp(createdDate.getTime()))
                .title(quizDTO.getTitle())
                .score(quizDTO.getScore())
                .tagId(quizTag)
                .build();
        quizRepository.saveAndFlush(newQuiz);
        log.debug("Finished creating new Quiz");
        return newQuiz.getQuizId();
    }

    @Override
    public UUID deleteQuiz(UUID quizId) {
        if(quizRepository.existsById(quizId)) throw new NoSuchElementException(
                MessageFormat.format("Quiz with Id {0} not found ", quizId));{
                    log.debug("deleting quiz");
                    quizRepository.deleteById(quizId);
                    return quizId;
        }
    }

    @Override
    public QuizDTO updateQuiz(QuizDTO quizDTO) {
        Optional<Quiz> quiz = quizRepository.findById(quizDTO.getQuizId());
        Optional<Tag> tag = tagRepository.findById(quizDTO.getTag().getTagId());
        if(quiz.isPresent() && tag.isPresent()){
            quiz.get().setTitle(quizDTO.getTitle());
            quiz.get().setScore(quizDTO.getScore());
            quiz.get().setTagId(tag.get());
            quizRepository.saveAndFlush(quiz.get());
            return quizDTO;
        }
        throw new NoSuchElementException(MessageFormat.format("Quiz or tag not found", quizDTO.getQuizId()));
    }

    @Override
    public QuizDTO getQuiz(UUID quizId) {
        if(quizRepository.existsById(quizId)) throw new NoSuchElementException(
                MessageFormat.format("Quiz with Id {0} not found ", quizId));{
            Quiz quiz = quizRepository.findById(quizId).get();
            QuizDTO quizDTO = new QuizDTO(
                    quiz.getQuizId(),
                    quiz.getCreatedDate(),
                    quiz.getTitle(),
                    quiz.getScore(),
                    new TagDTO(
                            quiz.getTagId().getTagId(),
                            quiz.getTagId().getTag()
                    )
            );
            return quizDTO;
        }
    }
}
