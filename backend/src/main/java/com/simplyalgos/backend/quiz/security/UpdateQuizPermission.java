package com.simplyalgos.backend.quiz.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;


//update only the user that created the quiz can update the quiz
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@PreAuthorize("hasAnyAuthority('quiz.update')")
public @interface  UpdateQuizPermission {
}
