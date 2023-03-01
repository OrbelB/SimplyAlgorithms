package com.simplyalgos.backend.quiz.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;

@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@PreAuthorize("(hasAnyAuthority('quiz.delete') AND " +
        "@customAuthManager.userIdMatches(authentication,#userId)) OR" +
        " hasRole(T(com.simplyalgos.backend.user.enums.UserRoles).ADMIN.name())")
public @interface  DeleteQuizPermission {
}
