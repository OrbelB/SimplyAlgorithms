package com.simplyalgos.backend.quiz.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;

@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@PreAuthorize("hasRole(T(com.simplyalgos.backend.user.enums.UserRoles).TEACHER.name()) OR " +
        "hasRole(T(com.simplyalgos.backend.user.enums.UserRoles).ADMIN.name())")
public @interface QuizTeacherAdminPermission {
}
