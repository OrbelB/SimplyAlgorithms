package com.simplyalgos.backend.user.services;

import com.simplyalgos.backend.emailing.services.EmailService;
import com.simplyalgos.backend.exceptions.ElementNotFoundException;
import com.simplyalgos.backend.storage.StorageService;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.dtos.*;
import com.simplyalgos.backend.user.enums.GetUsernameRequestEmailValues;
import com.simplyalgos.backend.user.enums.UserRoles;
import com.simplyalgos.backend.user.mappers.UserMapper;
import com.simplyalgos.backend.user.repositories.RoleRepository;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.repositories.projections.UserInformationOnly;
import com.simplyalgos.backend.user.security.Role;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import io.swagger.v3.core.util.Json;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;

import java.sql.Timestamp;
import java.text.MessageFormat;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RequiredArgsConstructor
@Slf4j
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    private final StorageService storageService;

    private final EmailService emailService;

    private final RoleRepository roleRepository;

    private final UserPreferenceService userPreferenceService;

    private final DashboardService dashboardService;


    @Override
    public void requestRoleChange(RoleChangeForm roleChangeForm) {
        Role admin = roleRepository.findRoleByRoleName(UserRoles.ADMIN.name()).orElseThrow(
                () -> new NoSuchElementException("Role not found")
        );
        Set<User> users = userRepository.findAllByRolesIn(Set.of(admin));
        log.debug("adding notification for role change request");
        StringBuffer message = new StringBuffer();
        message
                .append("User ")
                .append(roleChangeForm.username())
                .append(" requested to change role to: ")
                .append(roleChangeForm.role()).append(".\n")
                .append("The following is the school he/she is associated with:\n\n")
                .append(roleChangeForm.school()).append("\n\n")
                .append("And the reason for the role change is:\n\n")
                .append(roleChangeForm.reasoning()).append("\n\n")
                .append("Please login to the admin dashboard to approve or reject the request.");
        // send notification to admins to approve role change
        users.forEach(user -> {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject("Role Change Request");
            mailMessage.setText(message.toString());
            emailService.sendEmail(mailMessage);
            // send internal notification
            dashboardService.addAdminNotification(user, message.toString());
        });
    }

    public ObjectPagedList<UserInformationOnly> listAllUsers(Pageable pageable) {
        Page<UserInformationOnly> users = userRepository.findAllProjectedBy(pageable, UserInformationOnly.class);
        return new ObjectPagedList<>(
                users.toList(),
                PageRequest.of(
                        users.getPageable().getPageNumber(),
                        users.getPageable().getPageSize(),
                        users.getSort()
                ),
                users.getTotalElements()
        );
    }

    public UserDTO getUser(String userId) {
        // get user
        User user = userRepository.findById(UUID.fromString(userId))
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + userId + " not found"));
        UserPreferencesDTO userPreferencesDTO = userPreferenceService.getUserPreferences(UUID.fromString(userId));
        return userMapper.userToUserDto(user, userPreferencesDTO);
    }

    public User getUser(UUID userId) {
        return userRepository
                .findById(userId)
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + userId + " Not Found"));
    }

    @Transactional
    @Override
    public UserDTO updateUser(UserDataPostDTO userToUpdate) {
        User user = userRepository.findById(userToUpdate.getUserId()).orElseThrow(() ->
                new ElementNotFoundException(
                        MessageFormat
                                .format("user with id {0} not found", userToUpdate.getUserId())
                )
        );
        log.debug(MessageFormat.format("this is the passed profiledPicture {0}", userToUpdate.getProfilePicture()));
        userMapper.updateUser(userToUpdate, user);
        if (userToUpdate.getProfilePicture() != null) {
            user.setProfilePicture(storageService
                    .updateProfilePicture(userToUpdate.getProfilePicture(),
                            user.getProfilePicture()));
        }
        // notified user
        dashboardService.addAccountChangesNotification(user);
        return userMapper.userToUserDto(user);
    }

    @Override
    public boolean emailIsAvailable(String email) {
        return !userRepository.existsByEmail(email);
    }

    @Override
    public boolean usernameIsAvailable(String username) {
        return !userRepository.existsByUsername(username);
    }

    @Override
    public boolean userExists(UUID userId) {
        return userRepository.existsById(userId);
    }


    //will generate the token here and send it to the user
    @Override
    public User userUserNameExists(String username) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> {
            log.debug("USERNAME: " + username + " NOT FOUND");
            return new ElementNotFoundException();
        });
        log.debug("USER FOUND FROM FRONT END: " + username + " ----- FROM DATABASE" + user.getUsername());
        return user;
    }

    @Override
    public UUID removeUser(UUID userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            return userId;
        }
        throw new NoSuchElementException(MessageFormat.format("user with id {0} not found!",
                userId.toString()));
    }

    @Override
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> {
            log.debug("USERNAME: " + username + " NOT FOUND");
            return new ElementNotFoundException();
        });
    }

    @Override
    public boolean getUsername(GetUsernameDTO getUsernameDTO) {
        if (userRepository.existsByEmail(getUsernameDTO.getEmail())) {
            //if user exists then send email
            User user = userRepository.findByEmail(getUsernameDTO.getEmail()).orElseThrow(() -> {
//                log.info("USERNAME: " + getUsernameDTO.getEmail() + " NOT FOUND ~~~");
                return new ElementNotFoundException("Username cannot be found");
            });
//            log.info("EMAILING USER");
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setFrom(GetUsernameRequestEmailValues.FROM.label);
            simpleMailMessage.setSubject(GetUsernameRequestEmailValues.SUBJECT.label);
            simpleMailMessage.setText(GetUsernameRequestEmailValues.BODY.label + user.getUsername());
            simpleMailMessage.setTo(user.getEmail());
            emailService.sendEmail(simpleMailMessage);
            return true;
        }
        return false;
    }

    /*
     * This method will change the user role
     */
    @Override
    public UserInformation changeUserRole(String usernameOrId, String role) {
        if (roleRepository.existsByRoleName(role)) {
            User user = userRepository.findByUsername(usernameOrId).orElseGet(() ->
                    userRepository.findById(UUID.fromString(usernameOrId)).orElseThrow(() ->
                            new ElementNotFoundException("USERNAME OR USERID: " + usernameOrId + " NOT FOUND")
                    )
            );
            Role roleToAdd = roleRepository.findRoleByRoleName(role).orElseThrow(() ->
                    new ElementNotFoundException("ROLE: " + role + " NOT FOUND")
            );
            user.addRole(roleToAdd);
            // notify user of role change
            dashboardService.addRoleChangeNotification(user, roleToAdd.getRoleName());
            log.debug("USER: " + user.getUsername() + " ROLE CHANGED TO: " + role);
            return userMapper.userToUserInformation(userRepository.save(user));
        }
        throw new ElementNotFoundException("ROLE: " + role + " NOT FOUND");
    }

    @Override
    public UserInformation LockUserAccount(String usernameOrId, int lengthOfLock, boolean accountNonLocked) {
        User user = userRepository.findByUsername(usernameOrId).orElseGet(() ->
                userRepository.findById(UUID.fromString(usernameOrId)).orElseThrow(() ->
                        new ElementNotFoundException("USERNAME OR USERID : " + usernameOrId + " NOT FOUND")
                )
        );

        if(lengthOfLock > 365){
            lengthOfLock = 365;
        }

        if(lengthOfLock < -365) {
            lengthOfLock = -365;
        }

        String message =
                "You accounr has been unlocked you may log in at any time :) \n welcome back";
        String subject = "Account has been unlocked";
        user.setAccountNonLocked(accountNonLocked);
        if (!accountNonLocked) {
            //Admin in locking the account
            user.setAccountLockExpireDate(daysToTimestamp(lengthOfLock));
            String formattedTimestamp = user.getAccountLockExpireDate()
                    .toLocalDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
            message = "Hello, \n your account has been locked by an admin and will be unocked on: "
                    + formattedTimestamp +" \n If you belive this is an error Please reply to this email";
            subject = "Account " + user.getUsername() + " has been locked";

        }
//        send email to the user
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        emailService.sendEmail(mailMessage);
        return userMapper.userToUserInformation(userRepository.save(user));
    }

    @Override
    public boolean isUserLocked(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new NoSuchElementException("username note founds username: " + username));

//        log.debug("User information: " + user.getUsername() + " \n " + user.getAccountNonLocked());

        return !user.getAccountNonLocked();
    }

    @Override
    public Timestamp daysToTimestamp(int days) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DAY_OF_YEAR, days);
        Date expirationDate = calendar.getTime();
        return new Timestamp(expirationDate.getTime());
    }

    @Override
    public boolean accountLockExpired(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new NoSuchElementException("username note founds username: " + username));

        Calendar cal = Calendar.getInstance();
//        getAccountExpireDate hold the Timestamp date where the user's lock will be released;

//        log.debug("Account is expired? " + user.getAccountLockExpireDate().before(cal.getTime())
//                 + " Expire date: " + user.getAccountLockExpireDate() + " Todays daye: " + cal.getTime());

        if (user.getAccountLockExpireDate().before(cal.getTime())) {
//            user.setAccountLockExpireDate(null);
//            log.debug("updating the information");
            user.setAccountNonLocked(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
