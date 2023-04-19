package com.simplyalgos.backend.quiz.mappers;

import com.simplyalgos.backend.quiz.domains.*;
import com.simplyalgos.backend.quiz.dtos.*;
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

    @Mapping(source = "tagId.tagId", target = "tag.tagId")
    @Mapping(source = "tagId.tag", target = "tag.tag")
    QuizListInfoDTO QuizToQuizListDTO(Quiz quiz);


    @Mapping(source = "takenBy.userId", target = "userId")
    @Mapping(source = "quizReference.quizId", target = "quizId")
    TakeQuizDTO takeQuizToTakeQuizDTO(TakeQuiz takeQuiz);

    Set<QuestionAnswer> quizQuestionAnswerDTOToQuestionAnswer(Set<QuizQuestionAnswerDTO> quizQuestionAnswerDTOList);

    List<QuizQuestion> quizQuestionDTOToQuizQuestion(List<QuizQuestionDTO> quizQuestionDTO);

    List<TakeQuizDTO> takeQuizToTakeQuizDTO(List<TakeQuiz> takeQuizList);
    List<TakeQuiz> takeQuizDTOToTakeQuiz(List<TakeQuizDTO> takeQuizDTOList);



    List<TakenQuizzesDashboardDTO> takeQuizToTakenQuizzesDashboardDTO(List<TakeQuiz> takeQuizList);

    TakenQuizzesDashboardDTO takeQuizAverageToTakeQuizzesDashboardDTO(TakeQuizAverage takeQuizAverage);



}
