package com.simplyalgos.backend.page.services;

import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.page.domains.Views;
import com.simplyalgos.backend.page.domains.ids.ViewsId;
import com.simplyalgos.backend.page.repositories.ViewsRepository;
import com.simplyalgos.backend.user.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.MessageFormat;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;


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
        return viewsRepository.findAllByUserReferenceView_UserIdOrderByVisitedDateDesc(userId);
    }

    @Override
    public Integer countViewedForumsPerUser(UUID userId) {
        return viewsRepository.countAllByUserReferenceView_UserId(userId);
    }

    @Override
    public void removeView(UUID userId) {
        Views optionalView = viewsRepository.findFirstByUserReferenceView_UserIdOrderByVisitedDateAsc(userId)
                .orElseThrow(() ->
                        new ElementNotFoundException(MessageFormat.format("user with id {0} has no views",
                                userId.toString())));
        viewsRepository.deleteById(optionalView.getViewsId());
        log.debug(MessageFormat.format("viewed page {1} from user {0} has been removed", userId.toString(), optionalView.getViewsId()));


    }

}
