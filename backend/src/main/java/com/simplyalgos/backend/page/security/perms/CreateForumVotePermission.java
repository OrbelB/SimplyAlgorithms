package com.simplyalgos.backend.page.security.perms;


import org.springframework.security.access.prepost.PreAuthorize;

@PreAuthorize("hasAuthority('vote.create')")
public @interface CreateForumVotePermission {
}
