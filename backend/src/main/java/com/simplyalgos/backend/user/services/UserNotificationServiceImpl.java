package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.domains.UserNotification;
import com.simplyalgos.backend.user.dtos.NotificationDTO;
import com.simplyalgos.backend.user.enums.NotificationMessage;
import com.simplyalgos.backend.user.enums.NotificationType;
import com.simplyalgos.backend.user.enums.UserRoles;
import com.simplyalgos.backend.user.mappers.UserNotificationMapper;
import com.simplyalgos.backend.user.repositories.RoleRepository;
import com.simplyalgos.backend.user.repositories.UserNotificationRepository;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.security.Role;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;


@Transactional
@RequiredArgsConstructor
@Slf4j
@Service
public class UserNotificationServiceImpl implements UserNotificationService {

    private final UserPreferenceService userPreferenceService;

    private final UserNotificationRepository userNotificationRepository;

    private final UserNotificationMapper userNotificationMapper;


    private final UserRepository userRepository;

    private final RoleRepository roleRepository;


    @Override
    public void addNotification(UUID referenceId, String title, User user, NotificationMessage notificationMessage) {

        log.info("adding notification for user " + referenceId.toString() + " " + user.getUserId().toString());
        Optional<UserNotification> optionalUserNotification = userNotificationRepository
                .findByReferenceIdAndUserNotification_UserId(referenceId, user.getUserId());
        if (optionalUserNotification.isPresent()) {
            UserNotification userNotification = optionalUserNotification.get();
            short updatedNotificationQuantity = (short) (userNotification.getNotificationQuantity() + 1);
            if (notificationMessage.equals(NotificationMessage.ROLE_CHANGE)) {
                userNotification.setMessage(notificationMessage.message(title.split(":")[1].strip()));
                userNotification.setNotificationQuantity(updatedNotificationQuantity);
            } else {
                userNotification.setMessage(notificationMessage.message(updatedNotificationQuantity));
                userNotification.setNotificationQuantity(updatedNotificationQuantity);
            }
            log.debug("updating new notification for user " + referenceId);
            return;
        }
        if (notificationMessage == NotificationMessage.ROLE_CHANGE) {
            log.debug("adding new notification for user " + referenceId);
            userNotificationRepository.save(
                    userNotificationMapper
                            .createUserNotification(
                                    title,
                                    notificationMessage.message(title.split(":")[1].strip()),
                                    (short) 1, referenceId, user));
            return;
        }
        log.debug("adding new notification for user " + referenceId);
        userNotificationRepository.save(
                userNotificationMapper
                        .createUserNotification(title, notificationMessage.message((short) 1), (short) 1, referenceId, user));
    }

    @Override
    public void addUniversalReportNotification(User sendTo, UUID reportId,
                                               String title, String message,
                                               NotificationMessage notificationMessage) {
        if(notificationMessage.equals(NotificationMessage.REPORT_RESOLVED)){
            log.debug("Sending notification to victum (inside UserNotificationServiceImp)");
            userNotificationRepository.save(
                    userNotificationMapper.createUserNotification(
                            title,
                            message,
                            (short) 0,
                            reportId,
                            sendTo
                    ));
        } else {
            log.debug("Sending notification to all admins (inside UserNotificationServiceImp)");
            Role admin = roleRepository.findRoleByRoleName(UserRoles.ADMIN.name()).orElseThrow(
                    () -> new NoSuchElementException("Role not found")
            );
            Set<User> user = userRepository.findAllByRolesIn(Set.of(admin));
            user.forEach(notify -> {
                if(userPreferenceService.isNotificationEnableForType(NotificationType.ADMIN_NOTIFICATION, notify.getUserId())){
                    log.debug("Sending Admin: " + notify.getUsername() + " notification about report " + title);
                    userNotificationRepository.save(
                            userNotificationMapper.createUserNotification(
                                    title,
                                    notificationMessage.message(message),
                                    (short) 0,
                                    reportId,
                                    notify
                            ));
                }

            });

        }
    }


    @Override
    public void addRoleRequestChangeNotification(UUID referenceId, String title, User user, NotificationMessage notificationMessage, String message) {
        UserNotification userNotification = userNotificationRepository.findByReferenceIdAndUserNotification_UserId(referenceId, user.getUserId()).orElse(
                userNotificationRepository.save(
                        userNotificationMapper
                                .createUserNotification(title, notificationMessage.message(message), (short) 1, referenceId, user)
                ));
        userNotification.setMessage(notificationMessage.message(message));
        userNotification.setNotificationQuantity((short) 1);
    }

    @Override
    public ObjectPagedList<?> getNotifications(Pageable pageable, UUID userId) {
        Page<NotificationDTO> userNotifications = userNotificationRepository
                .findAllByUserNotification_UserId(userId, NotificationDTO.class, pageable);
        return new ObjectPagedList<>(userNotifications.stream().toList(),
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
