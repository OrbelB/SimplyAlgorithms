package com.simplyalgos.backend.quiz.mappers;

import com.simplyalgos.backend.quiz.domains.QuestionAnswer;
import com.simplyalgos.backend.quiz.domains.Quiz;
import com.simplyalgos.backend.quiz.domains.QuizQuestion;
import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import io.swagger.v3.core.util.Json;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.List;
import java.util.Set;

@Slf4j
@RequiredArgsConstructor
public class QuizMapperDecorator implements QuizMapper{

    private QuizMapper quizMapper;
    @Override
    public QuizDTO quizToQuizDTO(Quiz quiz) {
        return quizMapper.quizToQuizDTO(quiz);
    }

    @Override
    public Set<QuestionAnswer> quizQuestionAnswerDTOToQuestionAnswer(Set<QuizQuestionAnswerDTO> quizQuestionAnswerDTOList) {
        return quizMapper.quizQuestionAnswerDTOToQuestionAnswer(quizQuestionAnswerDTOList);
    }

    @Override
    public List<QuizQuestion> quizQuestionDTOToQuizQuestion(List<QuizQuestionDTO> quizQuestionDTO) {
        log.debug("quizQuestionDTO Size: " +  Json.pretty(quizQuestionDTO));
        List<QuizQuestion> quizQuestionList = quizMapper.quizQuestionDTOToQuizQuestion(quizQuestionDTO);
        for(int i = 0; i < quizQuestionList.size(); i++){
            quizQuestionList.get(i).setAnswerChoices(
            quizMapper.quizQuestionAnswerDTOToQuestionAnswer(
                    quizQuestionDTO.get(i).getAnswers()
            ));
        }
        return quizQuestionList;
    }

    @Autowired
    @Qualifier("delegate")
    public void setQuizMapper(QuizMapper quizMapper){
        this.quizMapper = quizMapper;
    }
}
