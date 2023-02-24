package com.simplyalgos.backend.quiz.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;

@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@PreAuthorize("hasAnyAuthority('quiz.take')")
public @interface TakeQuizPermission {
}
