package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.page.domains.Views;
import com.simplyalgos.backend.page.domains.ViewsId;
import com.simplyalgos.backend.page.repositories.ViewsRepository;
import com.simplyalgos.backend.user.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@RequiredArgsConstructor
@Service
@Slf4j
@Transactional
public class ViewsServiceImpl implements ViewsService {

    private final ViewsRepository viewsRepository;

    private final PageEntityService pageService;

    private final UserService userService;

    @Override
    public void addUserView(UUID userId, UUID pageId) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        viewsRepository.findById(ViewsId.builder().userId(userId).pageId(pageId).build())
                .ifPresentOrElse(views -> views.setVisitedDate(Timestamp.valueOf(now)),
                        () -> viewsRepository.save(
                                Views
                                        .builder()
                                        .pageViewed(pageService.getPageEntity(pageId))
                                        .userReferenceView(userService.getUser(userId))
                                        .viewsId(ViewsId
                                                .builder()
                                                .userId(userId)
                                                .pageId(pageId)
                                                .build()
                                        )
                                        .build()
                        )
                );


        // viewsRepository.addUserView(pageId.toString(), userId.toString());
    }


    @Override
    public Set<Views> listForumsByUserView(UUID userId) {
        Set<Views> views = viewsRepository.findAllByUserReferenceView_UserIdOrderByVisitedDateAsc(userId);
        log.info("the current views are " + views.size());
        return views;
    }

}
