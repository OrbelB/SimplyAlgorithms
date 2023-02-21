package com.simplyalgos.backend.quiz.services;

import com.simplyalgos.backend.quiz.domains.QuestionAnswer;
import com.simplyalgos.backend.quiz.domains.quizId.QuestionAnswerId;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import com.simplyalgos.backend.quiz.repositories.QuizQuestionAnswerRepository;
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
public class QuizQuestionAnswerServiceImp implements QuizQuestionAnswerService{
    private final QuizQuestionAnswerRepository answerRepository;
    @Override
//    assuming the quiz id and question id has already been created
    public QuizQuestionAnswerDTO createQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO) {
        log.debug("Starting the creation of new Question answer for questionId " + quizQuestionAnswerDTO.getQuestionId());
        QuestionAnswer questionAnswer = answerRepository.saveAndFlush(
                QuestionAnswer.builder()
                        .answer(quizQuestionAnswerDTO.getAnswer())
                        .isCorrect(quizQuestionAnswerDTO.isCorrect())
                        .questionAnswerId(QuestionAnswerId.builder()
                                .questionId(UUID.fromString(quizQuestionAnswerDTO.getQuestionId()))
                                .build())
                        .build()
        );
        return new QuizQuestionAnswerDTO(questionAnswer.getQuestionAnswerId().getAnswerID().toString(),
                questionAnswer.getQuestionAnswerId().getQuestionId().toString(),
                questionAnswer.isCorrect(),
                questionAnswer.getAnswer());

    }
    //spaghetti
    @Override
    public void saveAllQuizQuestionAnswers(QuizQuestionDTO quizQuestionDTO) {
        Iterator<QuizQuestionAnswerDTO> quizQuestionAnswerDTOIterator = quizQuestionDTO.getAnswers().iterator();
        log.debug("saving (creating) all of the answers for question: " + quizQuestionDTO.getQuizId());
        while(quizQuestionAnswerDTOIterator.hasNext()){
            createQuizQuestionAnswer(quizQuestionAnswerDTOIterator.next());
        }
    }

    @Override
    public void updateAllQuizQuestionAnswers(QuizQuestionDTO quizQuestionDTO) {
        Iterator<QuizQuestionAnswerDTO> quizQuestionAnswerDTOIterator = quizQuestionDTO.getAnswers().iterator();
        log.debug("Updating all of the answers for question: " + quizQuestionDTO.getQuestionId());
        while(quizQuestionAnswerDTOIterator.hasNext()){
            updateQuizQuestionAnswer(quizQuestionAnswerDTOIterator.next());
        }
    }

    @Override
    public QuizQuestionAnswerDTO updateQuizQuestionAnswer(QuizQuestionAnswerDTO quizQuestionAnswerDTO) {
        QuestionAnswerId questionAnswerId = QuestionAnswerId.builder()
                .answerID(UUID.fromString(quizQuestionAnswerDTO.getAnswerId()))
                .questionId(UUID.fromString(quizQuestionAnswerDTO.getQuestionId()))
                .build();

        Optional<QuestionAnswer> optionalQuestionAnswer = answerRepository.findById(questionAnswerId);
        if (optionalQuestionAnswer.isPresent()){
            log.debug("Updating the answer");
            QuestionAnswer questionAnswer = optionalQuestionAnswer.get();
            questionAnswer.setAnswer(quizQuestionAnswerDTO.getAnswer());
            questionAnswer.setCorrect(quizQuestionAnswerDTO.isCorrect());
            answerRepository.saveAndFlush(questionAnswer);
            log.debug("finished answer update");
            return quizQuestionAnswerDTO;
        }
        throw new NoSuchElementException(MessageFormat.format("Question Answer does not exists", quizQuestionAnswerDTO.getAnswerId()));
    }

    @Override
    public boolean deleteQuizQuestionAnswer(QuestionAnswerId questionAnswerId) throws NoSuchElementException {
        if (answerRepository.existsById(questionAnswerId))
            throw new NoSuchElementException(
                MessageFormat.format("Question Answer with Id {0} not found", questionAnswerId.getQuestionId()));{
                    answerRepository.deleteById(questionAnswerId);
                    log.debug("Answer quiz has been deleted");
                    return true;
        }
    }

    @Override
    public List<QuizQuestionAnswerDTO> getAllQuizQuestionAnswer(UUID questionId) {
        List<QuestionAnswer> questionAnswersList = answerRepository.findAllByQuestionId(questionId.toString());
        List<QuizQuestionAnswerDTO> quizQuestionAnswerDTOList = null;
        for(int i = 0; i < questionAnswersList.size(); i++){
            quizQuestionAnswerDTOList.add(new QuizQuestionAnswerDTO(
                    questionAnswersList.get(i).getQuestionAnswerId().getAnswerID().toString(),
                    questionAnswersList.get(i).getQuestionAnswerId().getQuestionId().toString(),
                    questionAnswersList.get(i).isCorrect(),
                    questionAnswersList.get(i).getAnswer()
                    ));
        }
        log.debug("ending of listing all of question answers");
        return quizQuestionAnswerDTOList;
    }

    @Override
    public QuizQuestionAnswerDTO getQuizQuestionAnswer(UUID answerId, UUID questionId) {
        QuestionAnswerId questionAnswerId = new QuestionAnswerId(answerId,questionId);
        if(answerRepository.existsById(questionAnswerId)) throw new NoSuchElementException(
                MessageFormat.format("Take Quiz with Id {0} not found", answerId));{
                    log.debug("returning quiz question answer");
                    Optional<QuestionAnswer> questionAnswer = answerRepository.findById(questionAnswerId);
                    return new QuizQuestionAnswerDTO(
                            questionAnswer.get().getQuestionAnswerId().getAnswerID().toString(),
                            questionAnswer.get().getQuestionAnswerId().getQuestionId().toString(),
                            questionAnswer.get().isCorrect(),
                            questionAnswer.get().getAnswer()
                            );

        }
    }

}
