package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.Quiz;
import com.simplyalgos.backend.quiz.domains.QuizQuestion;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import com.simplyalgos.backend.quiz.repositories.QuizQuestionRepository;
import com.simplyalgos.backend.quiz.repositories.QuizRepository;
import com.simplyalgos.backend.storage.StorageService;
import com.simplyalgos.backend.utils.ImageUtils;
import com.simplyalgos.backend.utils.StringUtils;
import io.swagger.v3.core.util.Json;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.*;
import java.text.MessageFormat;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class QuizQuestionServiceImp implements QuizQuestionService {
    private final QuizQuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    private final QuizQuestionAnswerServiceImp quizQuestionAnswerService;


    private final StorageService storageService;

    //    will create the quiz and its answers;
    @Override
    public List<QuizQuestionDTO> createAllQuizQuestionAndAnswers(List<QuizQuestionDTO> quizQuestionDTOList, UUID quizId) {
        log.debug("creating the quiz questions");
        log.debug("Quiz exists: " + quizRepository.existsById(quizId));
        for (int i = 0; i < quizQuestionDTOList.size(); i++) {
            quizQuestionDTOList.get(i).setQuizId(quizId);
            log.debug(i + " index with quiz id: " + quizId);
            UUID quizQuestionId = createQuizQuestion(quizQuestionDTOList.get(i));
            log.debug("The new question id: " + quizQuestionId);
            quizQuestionDTOList.get(i).setQuestionId(quizQuestionId);
        }
        log.debug("finished creating the quiz question");
        return quizQuestionDTOList;
    }

    @Override
//    this is assuming quiz id is already created
//    Answers and question will come in the QuizQuestionDTO, will separate and save each in Controller layer
    public UUID createQuizQuestion(QuizQuestionDTO quizQuestionDTO) {
        log.debug("Creating a new quiz question in createQuizQuestion with quiz id: " + quizQuestionDTO.getQuizId());
        Quiz optionalQuiz = quizRepository.findById(quizQuestionDTO.getQuizId()).orElseThrow(
                () -> new NoSuchElementException(
                        MessageFormat.format("Quiz with id {0} not found", quizQuestionDTO.getQuizId())));

        QuizQuestion.QuizQuestionBuilder quizQuestionBuilder = QuizQuestion.builder()
                .belongsToThisQuiz(optionalQuiz)
                .question(quizQuestionDTO.getQuestion());

        log.debug("ADDING PICTURE");
        if (StringUtils.isNotNullAndEmptyOrBlank(quizQuestionDTO.getPicture())) {
            quizQuestionBuilder.picture(
                    storageService.uploadImageFile(
                            ImageUtils.convertProfilePicture(
                                    quizQuestionDTO.getPicture(),
                                    "quiz-question-picture"
                            )

                    )
            );
        }
        QuizQuestion quizQuestion = questionRepository.saveAndFlush(
                quizQuestionBuilder.build()
        );
        return quizQuestion.getQuestionId();
    }


    private void removeQuestionsMissingInList(List<UUID> questionIds, UUID quizId) {
        List<QuizQuestion> quizQuestions = questionRepository
                .findAllByQuestionIdNotInAndBelongsToThisQuiz_QuizId(questionIds, quizId);

        // delete questions in the list that are not in the updated Quiz
        for (QuizQuestion quizQuestion : quizQuestions) {
            deleteQuizQuestion(quizQuestion.getQuestionId());
        }
    }

    @Override
    public List<QuizQuestionDTO> updateAllQuizQuestions(List<QuizQuestionDTO> quizQuestionDTOList) {
        List<QuizQuestionDTO> updatedQuizQuestionsDTO = new ArrayList<>();

        List<UUID> questionIds = quizQuestionDTOList
                .stream()
                .map(QuizQuestionDTO::getQuestionId)
                .toList();

        // remove questions not added to quizDto
        removeQuestionsMissingInList(questionIds, quizQuestionDTOList.get(0).getQuizId());
        //questions
        for (QuizQuestionDTO quizQuestionDTO : quizQuestionDTOList) {
            if (!StringUtils.isNotNullAndEmptyOrBlank(quizQuestionDTO.getQuestionId()) ||
                    !questionRepository.existsById(quizQuestionDTO.getQuestionId())) {
                log.debug("Adding a new Quiz question");
                log.debug("This is the quiz id ~~~: " + quizQuestionDTO.getQuizId());
                quizQuestionDTO.setQuestionId(
                        createQuizQuestion(quizQuestionDTO)
                );
                quizQuestionAnswerService.saveAllQuizQuestionAnswers(quizQuestionDTO);
                updatedQuizQuestionsDTO.add(getQuizQuestion(quizQuestionDTO.getQuizId(), quizQuestionDTO.getQuestionId()));
                log.debug("Added new QUestion Question: " + updatedQuizQuestionsDTO.size());
            } else {
                updatedQuizQuestionsDTO.add(updateQuizQuestionAndAnswers(quizQuestionDTO));
            }

            // delete removed answers
        }
        return updatedQuizQuestionsDTO;
    }


    // will update question and picture
    @Override
    public QuizQuestionDTO updateQuizQuestionAndAnswers(QuizQuestionDTO quizQuestionDTO) {
        Optional<QuizQuestion> optionalQuizQuestion = questionRepository.findById(quizQuestionDTO.getQuestionId());
        if (optionalQuizQuestion.isPresent()) {
//            if (quizQuestionDTO.isDeleteQuestion()) {
//                log.debug("Deleting question");
//                deleteQuizQuestion(quizQuestionDTO.getQuestionId());
//                return null;
//            } else {
            log.debug("Starting the update for questions");
            optionalQuizQuestion.get().setQuestion(quizQuestionDTO.getQuestion());

            if (StringUtils.isNotNullAndEmptyOrBlank(quizQuestionDTO.getPicture())) {
                File file = ImageUtils.convertProfilePicture(quizQuestionDTO.getPicture(), "quiz-question-picture");
                if (StringUtils.isNotNullAndEmptyOrBlank(file)) {
                    optionalQuizQuestion.get().setPicture(
                            storageService.updateProfilePicture(
                                    file,
                                    optionalQuizQuestion.get().getPicture())
                    );
                }
            }
            questionRepository.saveAndFlush(optionalQuizQuestion.get());
            log.debug("Question update has finished");

            quizQuestionAnswerService.updateAllQuizQuestionAnswers(quizQuestionDTO);
            return quizQuestionDTO;
        }
//        }
        throw new NoSuchElementException(MessageFormat.format("Quiz question does not exists", quizQuestionDTO.getQuestionId()));
    }

    @Override
    public boolean deleteQuizQuestion(UUID questionId) {

        if (questionRepository.existsById(questionId)) {
            questionRepository.deleteById(questionId);
            log.debug("quiz question has been deleted");
            return true;
        }
        throw new NoSuchElementException(
                MessageFormat.format("Question with Id {0} not found", questionId));
    }

    //    this may have issues due to the custom repository functions using jpa
    @Override
    public boolean deleteAllQuizQuestions(UUID quizId) {
        if (questionRepository.existsByBelongsToThisQuiz(quizId)) throw new NoSuchElementException(
                MessageFormat.format("Questions with Quiz Id {0} not found", quizId));
        {
            questionRepository.deleteAllByBelongsToThisQuiz(quizId);
            log.debug("quiz question 0has been deleted");
            return true;
        }
    }


    @Override
    public List<QuizQuestionDTO> getAllQuizQuestion(UUID quizId) {
        if (quizRepository.existsById(quizId)) {
            List<QuizQuestion> quizQuestionList = questionRepository.findAllByQuizId(quizId.toString());
            List<QuizQuestionDTO> quizQuestionDTOList = new ArrayList<>();
            for (QuizQuestion quizQuestion : quizQuestionList) {
                quizQuestionDTOList.add(QuizQuestionDTO.builder()
                        .deleteQuestion(false)
                        .deleteQuestion(false)
                        .question(quizQuestion.getQuestion())
                        .questionId(quizQuestion.getQuestionId())
                        .quizId(quizQuestion.getBelongsToThisQuiz().getQuizId())
                        .picture(quizQuestion.getPicture())
                        .answers(new HashSet<>(quizQuestionAnswerService
                                .getAllQuizQuestionAnswer
                                        (quizQuestion
                                                .getQuestionId())))
                        .build());
            }
            return quizQuestionDTOList;
        }
        throw new NoSuchElementException(
                MessageFormat.format("Quiz with id {0} not found", quizId));
    }


    @Override
    public QuizQuestionDTO getQuizQuestion(UUID quizId, UUID questionId) {
        if (quizRepository.existsById(quizId)) {
            Optional<QuizQuestion> optionalQuizQuestion = questionRepository.findById(questionId);
            if (optionalQuizQuestion.isPresent()) {
                return QuizQuestionDTO.builder()
                        .deleteQuestion(false)
                        .question(optionalQuizQuestion.get().getQuestion())
                        .questionId(optionalQuizQuestion.get().getQuestionId())
                        .quizId(optionalQuizQuestion.get().getBelongsToThisQuiz().getQuizId())
                        .picture(optionalQuizQuestion.get().getPicture())
                        .answers(new HashSet<>(quizQuestionAnswerService
                                .getAllQuizQuestionAnswer
                                        (optionalQuizQuestion
                                                .get()
                                                .getQuestionId())))
                        .build();
            }
        }
        throw new NoSuchElementException(
                MessageFormat.format("Quiz with id {0} not found", quizId));
    }
}
