package com.simplyalgos.backend.quiz.repositories.projections;

import com.simplyalgos.backend.comment.repositories.projections.UserInfoOnly;
import com.simplyalgos.backend.tag.repositories.projections.TagInfoOnly;
import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

public interface QuizInformation {

    @Value("#{target.quizId}")
    UUID getQuizId();

    @Value("#{target.title}")
    String getTitle();

    @Value("#{target.description}")
    String getDescription();

    @Value("#{target.picture}")
    String getPicture();

    @Value("#{target.score}")
    int getScore();

    @Value("#{target.createdDate}")
    String getCreatedDate();

    @Value("#{target.createdBy}")
    UserInfoOnly getCreatedBy();

    @Value("#{target.tagId}")
    TagInfoOnly getTag();



}
