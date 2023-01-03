package com.simplyalgos.backend.page.services;



import com.simplyalgos.backend.page.domains.Views;

import java.util.Set;
import java.util.UUID;

public interface ViewsService {

    void addUserView(UUID userId, UUID pageId);
    Set<Views> listForumsByUserView(UUID userId);
}
