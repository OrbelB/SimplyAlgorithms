package com.simplyalgos.backend.comment.security;


import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;

@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@PreAuthorize("(hasAuthority('comment.remove') AND @customAuthManager.userIdMatches(authentication,#userId)) " +
        "OR hasRole(T(com.simplyalgos.backend.user.enums.UserRoles).ADMIN.name())")
public @interface DeleteCommentPermission {
}
