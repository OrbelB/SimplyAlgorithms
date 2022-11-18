package com.simplyalgos.backend.user.security.perms;

import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasAuthority('user.delete') AND @customAuthManager.userIdMatches(authentication,#id)")
public @interface UserDeletePermission {
}
