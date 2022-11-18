package com.simplyalgos.backend.user.security.perms;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;

@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)
@PreAuthorize("hasAuthority('user.update') AND @customAuthManager.userIdMatches(authentication,#updatePassword.userId)")
public @interface UserUpdatePasswordPermission {
}
