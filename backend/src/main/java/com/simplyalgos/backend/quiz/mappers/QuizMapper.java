package com.simplyalgos.backend.quiz.mappers;

import com.simplyalgos.backend.quiz.domains.QuestionAnswer;
import com.simplyalgos.backend.quiz.domains.Quiz;
import com.simplyalgos.backend.quiz.domains.QuizQuestion;
import com.simplyalgos.backend.quiz.domains.TakeQuiz;
import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import org.mapstruct.*;

import java.util.List;
import java.util.Set;

@DecoratedWith(QuizMapperDecorator.class)
@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface QuizMapper {

    @Mapping(source = "tagId.tagId", target = "tag.tagId")
    @Mapping(source = "tagId.tag", target = "tag.tag")
    QuizDTO quizToQuizDTO(Quiz quiz);



    Set<QuestionAnswer> quizQuestionAnswerDTOToQuestionAnswer(Set<QuizQuestionAnswerDTO> quizQuestionAnswerDTOList);

    @Mapping(source="quizQuestionDTO.answers", target="answersChoices")
    List<QuizQuestion> quizQuestionDTOToQuizQuestion(List<QuizQuestionDTO> quizQuestionDTO);



}
