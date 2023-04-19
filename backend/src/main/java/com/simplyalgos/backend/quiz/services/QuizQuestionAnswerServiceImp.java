package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.QuestionAnswer;
import com.simplyalgos.backend.quiz.domains.QuizQuestion;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import com.simplyalgos.backend.quiz.repositories.QuizQuestionAnswerRepository;
import com.simplyalgos.backend.quiz.repositories.QuizQuestionRepository;
import com.simplyalgos.backend.utils.StringUtils;
import io.swagger.v3.core.util.Json;
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
public class QuizQuestionAnswerServiceImp implements QuizQuestionAnswerService {
    private final QuizQuestionAnswerRepository answerRepository;
    private final QuizQuestionRepository quizQuestionRepository;


    @Override
//    assuming the quiz id and question id has already been created
    public QuizQuestionAnswerDTO createQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO) {
//        log.debug("Starting the creation of new Question answer for questionId: " + quizQuestionAnswerDTO.getQuestionId());

        QuizQuestion quizQuestion = quizQuestionRepository.findById(quizQuestionAnswerDTO.getQuestionId())
                .orElseThrow(() -> new NoSuchElementException(
                        MessageFormat.format("Question does not exists ~~", quizQuestionAnswerDTO.getQuestionId())
                ));

//        log.debug("Optional QuizQuestion questionId: " + quizQuestion.getQuestionId());

//        log.debug("~~~" + quizQuestion.getQuestionId());
        QuestionAnswer questionAnswer = answerRepository.saveAndFlush(
                QuestionAnswer.builder()
                        .answer(quizQuestionAnswerDTO.getAnswer())
                        .isCorrect(quizQuestionAnswerDTO.getIsCorrect())
                        .answerBelongsToQuestion(quizQuestion)
                        .build()
        );
//        log.debug("++++");
        return QuizQuestionAnswerDTO.builder()
                .answerId(questionAnswer.getAnswerId())
                .questionId(questionAnswer.getAnswerBelongsToQuestion().getQuestionId())
                .answer(questionAnswer.getAnswer())
                .isCorrect(questionAnswer.getIsCorrect())
                .build();
    }


    //spaghetti
    @Override
    public void saveAllQuizQuestionAnswers(QuizQuestionDTO quizQuestionDTO) {
        Iterator<QuizQuestionAnswerDTO> quizQuestionAnswerDTOIterator = quizQuestionDTO.getAnswers().iterator();
//        log.debug("saving (creating) all of the answers for questionId : " + quizQuestionDTO.getQuestionId());
        Optional<QuizQuestion> quizQuestionOptional = quizQuestionRepository.findById(quizQuestionDTO.getQuestionId());
        if (quizQuestionOptional.isPresent()) {
            while (quizQuestionAnswerDTOIterator.hasNext()) {
                QuizQuestionAnswerDTO quizQuestionAnswerDTO = quizQuestionAnswerDTOIterator.next();
                quizQuestionAnswerDTO.setQuestionId(quizQuestionOptional.get().getQuestionId());
//                log.debug("Quiz id is set to: " + quizQuestionOptional.get().getQuestionId());
                createQuizQuestionAnswer(quizQuestionAnswerDTO);
            }
        } else {
            throw new NoSuchElementException(MessageFormat.format("Question does not exists + + +", quizQuestionDTO.getQuestionId()));
        }
    }

    @Override
    public void updateAllQuizQuestionAnswers(QuizQuestionDTO quizQuestionDTO) {
        Set<QuizQuestionAnswerDTO> quizQuestionAnswerDTOIterator = quizQuestionDTO.getAnswers();
//        log.debug("Updating all of the answers for question: " + quizQuestionDTO.getQuestionId());
        int i = 0;
//        log.debug("LOOK HERE: " + Json.pretty(quizQuestionDTO));

        List<QuizQuestionAnswerDTO> questionAnswers = new ArrayList<>();;
//        uestionAnswer questionAnswerSetIterableTemp : questionAnswerSet
        for (QuizQuestionAnswerDTO quizQuestionAnswerDTO: quizQuestionAnswerDTOIterator ) {
            questionAnswers.add(updateQuizQuestionAnswer(quizQuestionAnswerDTO));
        }

        List<UUID> removeNonIncludedAnswers = questionAnswers
                .stream()
                .map(QuizQuestionAnswerDTO::getAnswerId)
                .toList();

//        log.debug("Removing non included answers");
        removeMissingQuestionAnswers(removeNonIncludedAnswers, quizQuestionDTO.getQuestionId());

    }


    @Override
    public void removeMissingQuestionAnswers(List<UUID> answerIds, UUID questionId) {
        List<QuestionAnswer> questionAnswers = answerRepository
                .findAllByAnswerIdNotInAndAnswerBelongsToQuestion_QuestionId(answerIds, questionId);

//        log.debug("deleting non included answers" + Json.pretty(questionAnswers));
        for (QuestionAnswer questionAnswer: questionAnswers) {
//            log.debug("Deleting this AnswerId: " + questionAnswer.getAnswerId());
            deleteQuizQuestionAnswer(questionAnswer.getAnswerId());
        }
    }

    @Override
    public QuizQuestionAnswerDTO updateQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO) {

        Optional<QuestionAnswer> optionalQuestionAnswer = answerRepository.findById(quizQuestionAnswerDTO.getAnswerId());
        if (optionalQuestionAnswer.isPresent()) {
//            log.debug("Updating the answer");
            QuestionAnswer questionAnswer = optionalQuestionAnswer.get();
            questionAnswer.setAnswer(quizQuestionAnswerDTO.getAnswer());
            questionAnswer.setIsCorrect(quizQuestionAnswerDTO.getIsCorrect());
            answerRepository.saveAndFlush(questionAnswer);
//            log.debug("finished answer update");
            return quizQuestionAnswerDTO;
        }
        else {
//            log.debug("Creating a new answer for quiz +-+");
            return createQuizQuestionAnswer(quizQuestionAnswerDTO);
        }
//        throw new NoSuchElementException(MessageFormat.format("Question Answer does not exists", quizQuestionAnswerDTO.getAnswerId()));
    }

    @Override
    public boolean deleteQuizQuestionAnswer(UUID questionAnswerId) throws NoSuchElementException {
        if (answerRepository.existsById(questionAnswerId)) {
            answerRepository.deleteById(questionAnswerId);
//            log.debug("Answer quiz has been deleted");
            return true;
        }
        throw new NoSuchElementException(
                MessageFormat.format("Question Answer with Id {0} not found", questionAnswerId));
    }

    @Override
    public List<QuizQuestionAnswerDTO> getAllQuizQuestionAnswer(UUID questionId) {
        List<QuestionAnswer> questionAnswersList = answerRepository.findAllByAnswerBelongsToQuestion_QuestionId(questionId);
        List<QuizQuestionAnswerDTO> quizQuestionAnswerDTOList = new ArrayList<>();
        for (QuestionAnswer questionAnswer : questionAnswersList) {
            quizQuestionAnswerDTOList.add(
                    QuizQuestionAnswerDTO
                            .builder()
                            .isCorrect(questionAnswer.getIsCorrect())
                            .answerId(questionAnswer.getAnswerId())
                            .answer(questionAnswer.getAnswer())
                            .questionId(questionId)
                            .build());
        }
//        log.debug("ending of listing all of question answers");
        return quizQuestionAnswerDTOList;
    }

    @Override
    public QuizQuestionAnswerDTO getQuizQuestionAnswer(UUID answerId, UUID questionId) {
        if (answerRepository.existsById(answerId)) throw new NoSuchElementException(
                MessageFormat.format("Take Quiz with Id {0} not found", answerId));
        {
//            log.debug("returning quiz question answer");
            Optional<QuestionAnswer> questionAnswer = answerRepository.findById(answerId);
            return new QuizQuestionAnswerDTO(
                    questionAnswer.get().getAnswerId(),
                    questionAnswer.get().getAnswerBelongsToQuestion().getQuestionId(),
                    questionAnswer.get().getIsCorrect(),
                    questionAnswer.get().getAnswer(),
                    false
            );

        }
    }

}
