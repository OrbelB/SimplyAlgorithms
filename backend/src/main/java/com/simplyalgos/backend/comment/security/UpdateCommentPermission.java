package com.simplyalgos.backend.comment.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;

@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@PreAuthorize("hasAuthority('comment.update') AND   @customAuthManager.userIdMatches(authentication,#commentDTO.userId)")
public @interface UpdateCommentPermission {
}
