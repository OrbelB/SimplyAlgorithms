package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.Quiz;
import com.simplyalgos.backend.quiz.dtos.FullQuizDTO;
import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import com.simplyalgos.backend.quiz.mappers.QuizMapper;
import com.simplyalgos.backend.quiz.repositories.QuizRepository;
import com.simplyalgos.backend.tag.domains.Tag;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.tag.repositories.TagRepository;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.UserDTO;
import com.simplyalgos.backend.user.dtos.UserDataDTO;
import com.simplyalgos.backend.user.mappers.UserMapper;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import io.swagger.v3.core.util.Json;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;

import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;

import java.text.MessageFormat;
import java.util.*;
import java.util.stream.Collectors;
import com.simplyalgos.backend.utils.StringUtils;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class QuizServiceImp implements QuizService {

    private final QuizRepository quizRepository;

    private final TagRepository tagRepository;

    private final QuizMapper quizMapper;

    private final QuizQuestionService quizQuestionService;

    private final UserRepository userRepository;

    private final UserService userService;

    private final UserMapper userMapper;

    @Override
    public ObjectPagedList<?> listQuizPages(Pageable pageable) { //why must i do this? why?
        Page<Quiz> quizPage = quizRepository.findAll(pageable);
        return new ObjectPagedList<>(
                quizPage.stream()
                        .collect(Collectors.toList()),
                PageRequest.of(
                        quizPage.getPageable().getPageNumber(),
                        quizPage.getPageable().getPageSize()),
                quizPage.getTotalElements()
                );
    }

    @Override
    public ObjectPagedList listQuizPageWithTag(Pageable pageable, String tag) {
        Page<Quiz> quizPage = quizRepository.findAllByTagId_TagId(UUID.fromString(tag), pageable);
        return new ObjectPagedList<>(
                quizPage.stream()
                        .map(quizMapper::quizToQuizDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        quizPage.getPageable().getPageNumber(),
                        quizPage.getPageable().getPageSize(),
                        quizPage.getSort()),
                quizPage.getTotalElements()
        );
    }

    @Transactional
    @Override
    public UUID createQuizWithFullQuizDTO(FullQuizDTO fullQuizDTO) {
//        QuizDTO quizDTO = fullQuizDTO.getQuizDTO();
        log.debug("Creating a new Quiz");
//        log.debug("Here is the tag information " + quizDTO.getTag().getTag() + " this tag Id: " + quizDTO.getTag().getTagId());

        Tag quizTag = tagExists(fullQuizDTO.getQuizDTO());
        log.debug("the paseed in user Id: " + fullQuizDTO.getUserDto().getUserId());
        Optional<User> userOptional = userRepository.findById(fullQuizDTO.getUserDto().getUserId());


        log.debug("the user id: " + userOptional.get().getUserId());

        Quiz newQuiz = quizRepository.saveAndFlush(
                Quiz.builder()
                        .createdBy(userOptional.get())
                        .title(fullQuizDTO.getQuizDTO().getTitle())
                        .score(fullQuizDTO.getQuizDTO().getScore())
                        .tagId(quizTag)
                        .build()
        );

        fullQuizDTO.getQuizDTO().setQuizId(newQuiz.getQuizId());

        log.debug("finished creating of new quiz" + newQuiz.getQuizId());

        log.debug("Quiz Service QuizQuestionDTO JSON: ", Json.pretty(fullQuizDTO.getQuizQuestionDTO()));
        return newQuiz.getQuizId();

    }

//    checks to see if a tag exists, returns a tag.
//    If new tag then it will be created.
    private Tag tagExists(QuizDTO quizDTO){
        Tag quizTag = null;
        if(StringUtils.isNotNullAndEmptyOrBlank(quizDTO.getTag())){
            log.debug("inside the tag if else");
            if(!StringUtils.isNotNullAndEmptyOrBlank(quizDTO.getTag().getTagId())){
//            will create the tag if it's new
                log.debug("Here is the tag: " + quizDTO.getTag().getTag());
                quizTag = Tag.builder()
                        .tag(quizDTO.getTag().getTag())
                        .build();
                tagRepository.save(quizTag);
                log.debug("Creating a new Tag tagId: " + quizTag.getTagId());
            }
            else {
                log.debug("the tag id passed in is: " + quizDTO.getTag().getTagId());
                quizTag = tagRepository.findById(quizDTO.getTag().getTagId()).get();
                log.debug("Tag already exists tagId: " +  quizTag.getTagId());
            }
        }
        return quizTag;
    }
    @Override
    public UUID deleteQuiz(UUID quizId) {
        log.debug("This is the Quiz id Passed in: " + quizId + " " + quizRepository.existsById(quizId));

        if(!quizRepository.existsById(quizId)){
            throw new NoSuchElementException(
                    MessageFormat.format("Quiz with Id {0} not found ", quizId));
        }
        log.debug("deleting quiz");
//      how to make it cascade
        quizRepository.deleteById(quizId);
        return quizId;
    }


    //will update quiz, all questions, and answers
    @Override
    public FullQuizDTO updateFullQuiz(FullQuizDTO fullQuizDTO) {
        Optional<Quiz> quizOptional = quizRepository.findById(fullQuizDTO.getQuizDTO().getQuizId());
        if(quizOptional.isPresent()){
            fullQuizDTO.setQuizDTO(updateQuiz(fullQuizDTO.getQuizDTO()));
            fullQuizDTO.setQuizQuestionDTO(quizQuestionService.updateAllQuizQuestions(fullQuizDTO.getQuizQuestionDTO()));
            return fullQuizDTO;
        }
        throw new NoSuchElementException(MessageFormat.format("Quiz or tag not found QuizId: ", fullQuizDTO.getQuizDTO().getQuizId()));
    }

    @Override
    public QuizDTO updateQuiz(QuizDTO quizDTO) {
        Optional<Quiz> quiz = quizRepository.findById(quizDTO.getQuizId());
        Tag quizTag = tagExists(quizDTO);
        if(quiz.isPresent()){
            quiz.get().setTitle(quizDTO.getTitle());
            quiz.get().setScore(quizDTO.getScore());
            quiz.get().setTagId(quizTag);
            quizRepository.saveAndFlush(quiz.get());
            return quizDTO;
        }
        throw new NoSuchElementException(MessageFormat.format("Quiz or tag not found", quizDTO.getQuizId()));
    }



    @Override
    public QuizDTO getQuiz(UUID quizId) {
        if(quizRepository.existsById(quizId)){
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
        throw new NoSuchElementException(
                MessageFormat.format("Quiz with Id {0} not found ", quizId));
    }

    @Override
    public FullQuizDTO getFullQuiz(UUID quizId) {
        Optional<Quiz> quizOptional = quizRepository.findById(quizId);
        if(quizOptional.isPresent()){
            return FullQuizDTO.builder()
                    .quizDTO(quizMapper.quizToQuizDTO(quizOptional.get()))
                    .quizQuestionDTO(quizQuestionService.getAllQuizQuestion(quizId))
                    .userDto(UserDataDTO.builder()
                            .userId(quizOptional.get().getCreatedBy().getUserId())
                            .firstName(quizOptional.get().getCreatedBy().getFirstName())
                            .lastName(quizOptional.get().getCreatedBy().getLastName())
                            .username(quizOptional.get().getCreatedBy().getUsername())
                            .profilePicture(quizOptional.get().getCreatedBy().getProfilePicture())
                            .build())
                    .build();
        }
        throw new NoSuchElementException(
                MessageFormat.format("Quiz with Id {0} not found ", quizId));
    }
}
