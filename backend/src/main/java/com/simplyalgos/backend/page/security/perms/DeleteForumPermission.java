package com.simplyalgos.backend.page.security.perms;

import org.springframework.security.access.prepost.PreAuthorize;


import java.lang.annotation.Retention;

@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@PreAuthorize("(hasAuthority('forum.delete') AND @customAuthManager.userIdMatches(authentication,#userId))" )
public @interface DeleteForumPermission {
}
