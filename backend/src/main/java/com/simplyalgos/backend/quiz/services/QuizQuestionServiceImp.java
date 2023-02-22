package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.Quiz;
import com.simplyalgos.backend.quiz.domains.QuizQuestion;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import com.simplyalgos.backend.quiz.repositories.QuizQuestionAnswerRepository;
import com.simplyalgos.backend.quiz.repositories.QuizQuestionRepository;
import com.simplyalgos.backend.quiz.repositories.QuizRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
@Transactional
public class QuizQuestionServiceImp implements QuizQuestionService{
    private final QuizQuestionRepository questionRepository;
    private final QuizRepository quizRepository;

    private final QuizQuestionAnswerServiceImp quizQuestionAnswerService;


//    will create the quiz and its answers;
    @Override
    public List<QuizQuestionDTO> createAllQuizQuestionAndAnswers(List<QuizQuestionDTO> quizQuestionDTOList, UUID quizId) {
        log.debug("creating the quiz");
        log.debug("Quiz exists: " + quizRepository.existsById(quizId));
        for(int i = 0; i < quizQuestionDTOList.size(); i++){
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

        Optional<Quiz> optionalQuiz = quizRepository.findById(quizQuestionDTO.getQuizId());

        if(optionalQuiz.isPresent()){
            QuizQuestion quizQuestion = questionRepository.saveAndFlush(
                    QuizQuestion.builder()
                            .belongsToThisQuiz(optionalQuiz.get())
                            .question(quizQuestionDTO.getQuestion())
                            .picture(quizQuestionDTO.getPicture())
                            .build()
            );
            return quizQuestion.getQuestionId();
        }
        throw new NoSuchElementException(
                MessageFormat.format("Quiz with id {0} not found", quizQuestionDTO.getQuizId()));
    }


//    will update question and picture
    @Override
    public QuizQuestionDTO updateQuizQuestion(QuizQuestionDTO quizQuestionDTO) {
        Optional<QuizQuestion> optionalQuizQuestion = questionRepository.findById(quizQuestionDTO.getQuestionId());
        if(optionalQuizQuestion.isPresent()){
            optionalQuizQuestion.get().setQuestion(quizQuestionDTO.getQuestion());
            optionalQuizQuestion.get().setPicture(quizQuestionDTO.getPicture());
            questionRepository.saveAndFlush(optionalQuizQuestion.get());
            log.debug("Question update has finished");
            quizQuestionAnswerService.updateAllQuizQuestionAnswers(quizQuestionDTO);
            return  quizQuestionDTO;
        }
        throw  new NoSuchElementException(MessageFormat.format("Quiz question does not exists", quizQuestionDTO.getQuestionId()));
    }

    @Override
    public boolean deleteQuizQuestion(UUID questionId) {
        if (questionRepository.existsById(questionId)) throw new NoSuchElementException(
                MessageFormat.format("Question with Id {0} not found", questionId));{
            questionRepository.deleteById(questionId);
            log.debug("quiz question has been deleted");
            return true;
        }
    }

//    this may have issues due to the custom repository functions using jpa
    @Override
    public boolean deleteAllQuizQuestions(UUID quizId) {
        if (questionRepository.existsByBelongsToThisQuiz(quizId)) throw new NoSuchElementException(
                MessageFormat.format("Questions with Quiz Id {0} not found", quizId));{
            questionRepository.deleteAllByBelongsToThisQuiz(quizId);
            log.debug("quiz question 0has been deleted");
            return true;
        }
    }



    @Override
    public List<QuizQuestionDTO> getAllQuizQuestion(UUID quizId) {
        if(quizRepository.existsById(quizId)) throw new NoSuchElementException(
                MessageFormat.format("Quiz with id {0} not found", quizId));{
                    List<QuizQuestion> quizQuestionList = questionRepository.findAllByQuizId(quizId.toString());
                    List<QuizQuestionDTO> quizQuestionDTOList = null;
                    for(int i = 0; i < quizQuestionList.size(); i++){
                        quizQuestionDTOList.add(new QuizQuestionDTO(
                                quizQuestionList.get(i).getQuestionId(),
                                quizQuestionList.get(i).getBelongsToThisQuiz().getQuizId(),
                                quizQuestionList.get(i).getQuestion(),
                                quizQuestionList.get(i).getPicture(),
                                new HashSet<>(quizQuestionAnswerService
                                        .getAllQuizQuestionAnswer
                                                (quizQuestionList.get(i)
                                                        .getQuestionId()))
                        ));
                    }
                    return quizQuestionDTOList;
        }
    }


    @Override
    public QuizQuestionDTO getQuizQuestion(UUID quizId, UUID questionId) {
        if(quizRepository.existsById(quizId)) throw new NoSuchElementException(
                MessageFormat.format("Quiz with id {0} not found", quizId));{
                    Optional<QuizQuestion> optionalQuizQuestion = questionRepository.findById(questionId);
                    return new QuizQuestionDTO(
                            optionalQuizQuestion.get().getQuestionId(),
                            optionalQuizQuestion.get().getBelongsToThisQuiz().getQuizId(),
                            optionalQuizQuestion.get().getQuestion(),
                            optionalQuizQuestion.get().getPicture(),
                            new HashSet<>(quizQuestionAnswerService
                                    .getAllQuizQuestionAnswer
                                            (optionalQuizQuestion
                                                    .get()
                                                    .getQuestionId()))
                    );
        }
    }
}
