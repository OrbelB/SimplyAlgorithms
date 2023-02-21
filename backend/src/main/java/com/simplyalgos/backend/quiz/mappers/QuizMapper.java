package com.simplyalgos.backend.quiz.mappers;

import com.simplyalgos.backend.quiz.domains.Quiz;
import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValueCheckStrategy;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValueCheckStrategy = NullValueCheckStrategy.ALWAYS,
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface QuizMapper {

    @Mapping(source = "tagId.tagId", target = "tag.tagId")
    @Mapping(source = "tagId.tag", target = "tag.tag")
    QuizDTO quizToQuizDTO(Quiz quiz);
}
