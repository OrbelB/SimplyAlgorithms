package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.NotificationDTO;
import com.simplyalgos.backend.user.enums.NotificationMessage;
import com.simplyalgos.backend.user.mappers.UserNotificationMapper;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;
import com.simplyalgos.backend.user.domains.UserNotification;
import com.simplyalgos.backend.user.repositories.UserNotificationRepository;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;

import org.springframework.stereotype.Service;


import java.util.Optional;
import java.util.Set;
import java.util.UUID;


@Transactional
@RequiredArgsConstructor
@Slf4j
@Service
public class UserNotificationServiceImpl implements UserNotificationService {

    private final UserNotificationRepository userNotificationRepository;

    private final UserNotificationMapper userNotificationMapper;


    @Override
    public void addNotification(UUID referenceId, String title, User user, NotificationMessage notificationMessage) {

        log.info("adding notification for user " + referenceId.toString() + " " + user.getUserId().toString());
        Optional<UserNotification> optionalUserNotification = userNotificationRepository
                .findByReferenceIdAndUserNotification_UserId(referenceId, user.getUserId());
        if (optionalUserNotification.isPresent()) {
            UserNotification userNotification = optionalUserNotification.get();
            short updatedNotificationQuantity = (short) (userNotification.getNotificationQuantity() + 1);
            if (notificationMessage == NotificationMessage.ROLE_REQUEST) {
                userNotification.setMessage(notificationMessage.message(title.substring(0, title.indexOf(" "))));
                userNotification.setNotificationQuantity(updatedNotificationQuantity);
            } else if (notificationMessage.equals(NotificationMessage.ROLE_CHANGE)) {
                userNotification.setMessage(notificationMessage.message(title.split(":")[1].strip()));
                userNotification.setNotificationQuantity(updatedNotificationQuantity);
            } else {
                userNotification.setMessage(notificationMessage.message(updatedNotificationQuantity));
                userNotification.setNotificationQuantity(updatedNotificationQuantity);
            }
            log.debug("updating new notification for user " + referenceId.toString());
            return;
        }
        if (notificationMessage == NotificationMessage.ROLE_REQUEST) {
            log.debug("adding new notification for user " + referenceId.toString());
            userNotificationRepository.save(
                    userNotificationMapper
                            .createUserNotification(
                                    title,
                                    notificationMessage.message(title.substring(0, title.indexOf(" "))),
                                    (short) 1, referenceId, user));
            return;
        } else if (notificationMessage == NotificationMessage.ROLE_CHANGE) {
            log.debug("adding new notification for user " + referenceId.toString());
            userNotificationRepository.save(
                    userNotificationMapper
                            .createUserNotification(
                                    title,
                                    notificationMessage.message(title.split(":")[1].strip()),
                                    (short) 1, referenceId, user));
            return;
        }
        log.debug("adding new notification for user " + referenceId.toString());
        userNotificationRepository.save(
                userNotificationMapper
                        .createUserNotification(title, notificationMessage.message((short) 1), (short) 1, referenceId, user));
    }

    @Override
    public ObjectPagedList<?> getNotifications(Pageable pageable, UUID userId) {
        Page<UserNotification> userNotifications = userNotificationRepository
                .findAllByUserNotification_UserId(userId, pageable);
        return new ObjectPagedList<>(userNotifications.getContent(),
                PageRequest.of(userNotifications.getNumber(),
                        userNotifications.getSize(),
                        userNotifications.getSort()),
                userNotifications.getTotalElements());
    }

    public Set<NotificationDTO> getNotifications(UUID userId) {
        return userNotificationMapper.notificationToNotificationDTO(userNotificationRepository.findAllByUserNotification_UserId(userId));
    }

    @Override
    public UUID removeNotification(UUID notificationId) {
        if (userNotificationRepository.existsById(notificationId)) {
            userNotificationRepository.deleteById(notificationId);
            return notificationId;
        }
        throw new ElementNotFoundException("The notification cannot be removed because is not in our records");
    }
}
