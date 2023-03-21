package com.simplyalgos.backend.notes.security;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;
@Retention(java.lang.annotation.RetentionPolicy.RUNTIME)

@PreAuthorize("@customAuthManager.userIdMatches(authentication,#userNoteDTO.createdBy.userId)")
public @interface CreateNotePermission {
}
