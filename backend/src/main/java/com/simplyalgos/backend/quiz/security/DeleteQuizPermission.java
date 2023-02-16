package com.simplyalgos.backend.quiz.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;

@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@PreAuthorize("hasAnyAuthority('quiz.delete') AND @customAuthManager.userIdMatches(authentication,#userId)")
public @interface  DeleteQuizPermission {
}
