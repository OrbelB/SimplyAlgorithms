package com.simplyalgos.backend.universalReport.service;

import com.simplyalgos.backend.emailing.services.EmailService;
import com.simplyalgos.backend.exceptions.EmptyVariableException;
import com.simplyalgos.backend.universalReport.domain.UniversalReport;
import com.simplyalgos.backend.universalReport.dto.UniversalReportDTO;
import com.simplyalgos.backend.universalReport.enums.UniversalReportCategories;
import com.simplyalgos.backend.universalReport.mapper.UniversalReportMapper;
import com.simplyalgos.backend.universalReport.repository.UniversalReportRepository;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.enums.NotificationMessage;
import com.simplyalgos.backend.user.enums.NotificationType;
import com.simplyalgos.backend.user.enums.UserRoles;
import com.simplyalgos.backend.user.repositories.RoleRepository;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.security.Role;
import com.simplyalgos.backend.user.services.UserNotificationService;
import com.simplyalgos.backend.user.services.UserPreferenceService;
import com.simplyalgos.backend.user.services.UserService;
import com.simplyalgos.backend.utils.StringUtils;
import com.simplyalgos.backend.web.pagination.ObjectPagedList;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
public class UniversalReportServiceImp implements  UniversalReportService{


    private final UniversalReportMapper universalReportMapper;
    private final UserNotificationService userNotificationService;

    private final UserService userService;

    private final UserPreferenceService userPreferenceService;

    private final UniversalReportRepository urr;

    private final RoleRepository roleRepository;

    private final UserRepository userRepository;

    private final EmailService emailService;

    //    will send a notification to all admins
    @Override
    public UUID createReport(UniversalReportDTO universalReportDTO) {
        if(StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO)){
            if (StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO.getForeignId()) &&
                    StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO.getVictimUser()) &&
                    StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO.getTypeOfForeignId()) &&
                    StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO.getCatagory()) &&
                    StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO.getReport())
            ) {
                UniversalReport newReport = UniversalReport.builder()
                        .foreignId(universalReportDTO.getForeignId())
                        .typeOfForeignId(universalReportDTO.getTypeOfForeignId())
                        .catagory(universalReportDTO.getCatagory())
                        .report(universalReportDTO.getReport())
                        .victimUser(userService.getUser(universalReportDTO.getVictimUser()))
                        .isResolved("No").build();
                if(StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO.getCulpritUser())){
                    newReport.setCulpritUser (userService
                            .getUser(universalReportDTO.getCulpritUser()));
                }
                UniversalReport universalReport = urr.saveAndFlush(newReport);
                notifyAllAdminsAboutNewReport(universalReportMapper
                        .UniversalReportToUniversalReportDTO(universalReport));

                return universalReport.getReportId();
            }
        }
        throw new EmptyVariableException("required variable not filled out");
    }

    @Override
    public void generateAdminNotification(UniversalReportDTO universalReportDTO, NotificationMessage notificationMessage) {
        userNotificationService.addUniversalReportNotification(
                User.builder().build(),
                universalReportDTO.getReportId(),
                createTitle(universalReportDTO),
                createMessage(universalReportDTO),
                notificationMessage
        );
    }

    private String createMessage(UniversalReportDTO universalReportDTO){
        return "Report for " + universalReportDTO.getCatagory() + " on "
                + universalReportDTO.getReportDate() + " reportId: " + universalReportDTO.getReportId()
                + " reported by userId: " + universalReportDTO.getVictimUser();
    }

    private String createTitle(UniversalReportDTO universalReportDTO){
        return "new report has been created, ";
    }

    @Override
    public void notifyAllAdminsAboutNewReport(UniversalReportDTO universalReportDTO) {
        String category = universalReportDTO.getCatagory();
        if(UniversalReportCategories.PROFANITY_REPORT.toString().equals(category)){
            log.debug("Notifying all admins of profanity report (UniversalReportServiceImp)");
//            send the
            generateAdminNotification(universalReportDTO, NotificationMessage.PROFANITY_REPORT);

        } else if (UniversalReportCategories.INCORRECT_INFORMATION_REPORT.toString().equals(category)){
            log.debug("Notifying all admins of incorrect information report (UniversalReportServiceImp)");
            generateAdminNotification(universalReportDTO, NotificationMessage.INCORRECT_INFORMATION_REPORT);

        } else if (UniversalReportCategories.ERROR_REPORT.toString().equals(category)) {
            log.debug("Notifying all admins of error report (UniversalReportServiceImp)");
            generateAdminNotification(universalReportDTO, NotificationMessage.ERROR_REPORT);
        } else {
            log.debug("This is a other catagory: " + category + " (UniversalReportServiceImp)");
            generateAdminNotification(universalReportDTO, NotificationMessage.OTHER_REPORT);
        }
        emailReportToAllAdmins(createTitle(universalReportDTO),createMessage(universalReportDTO));
    }

    @Override
    public void notifyUserRegardingClosedReport(UniversalReportDTO universalReportDTO) {
        User user = userService.getUser(universalReportDTO.getVictimUser());
        if (userPreferenceService.isNotificationEnableForType(NotificationType.SPECIAL_UPDATES, user.getUserId())){
            log.debug("Sending a resolved notification to user");
            userNotificationService.addUniversalReportNotification(
                    user,
                    universalReportDTO.getReportId(),
                    universalReportDTO.getCatagory() + " report has been resolved, thank you for being vigilant",
                    universalReportDTO.getResolveNote(),
                    NotificationMessage.REPORT_RESOLVED
            );
        }
    }

    @Override
    public UUID deleteReport(UUID reportId) {
        if(urr.existsById(reportId)){
            urr.deleteById(reportId);
            return reportId;
        }
        throw new NoSuchElementException(MessageFormat
                .format("report with id {0} not found!", reportId));
    }

//    Cannot update victimId
//    report date
//

    @Override
    public UniversalReportDTO updateReport(UniversalReportDTO universalReportDTO) {
        UniversalReport universalReport = urr.findById(universalReportDTO.getReportId())
                .orElseThrow(() -> new NoSuchElementException(MessageFormat.
                        format("Report with id {0} not found", universalReportDTO.getReportId())));

        if (StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO.getForeignId())
                && StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO.getTypeOfForeignId())) {
            universalReport.setForeignId(universalReportDTO.getForeignId());
            universalReport.setTypeOfForeignId(universalReport.getTypeOfForeignId());
        }
        if (StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO.getResolvedBy())){
            universalReport.setResolvedBy(userService.getUser(universalReportDTO.getResolvedBy()));
        }
        if(StringUtils.isNotNullAndEmptyOrBlank(universalReportDTO.getCulpritUser())){
            universalReport.setCulpritUser(userService.getUser(universalReportDTO.getCulpritUser()));
        }
        universalReport.setCatagory(universalReportDTO.getCatagory());
        universalReport.setReport(universalReportDTO.getReport());
        universalReport.setResolveNote(universalReportDTO.getResolveNote());
        universalReport.setResolveDate(universalReportDTO.getResolveDate());
        universalReport.setIsResolved(universalReportDTO.getIsResolved());

        if(universalReportDTO.getIsResolved().equals("resolved")){
            notifyUserRegardingClosedReport(universalReportDTO);
        }
        return universalReportMapper.UniversalReportToUniversalReportDTO(urr.saveAndFlush(universalReport));
    }

    @Override
    public UniversalReportDTO getUniversalReport(UUID reportId) {
        return universalReportMapper.UniversalReportToUniversalReportDTO(
                urr.findById(reportId).orElseThrow(() -> new NoSuchElementException(
                        MessageFormat.format("Report with Id {0} not found", reportId))));
    }

//    UPDATE
    @Override
    public ObjectPagedList<?> listReport(Pageable pageable) {
        Page<UniversalReport> universalReportPage = urr.findAll(pageable);
        return new ObjectPagedList<>(
                universalReportPage
                        .stream()
                        .map(universalReportMapper::UniversalReportToUniversalReportDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        universalReportPage.getPageable().getPageNumber(),
                        universalReportPage.getPageable().getPageSize(),
                        universalReportPage.getSort()),
                universalReportPage.getTotalElements()
        );
    }

//    UPDATE
    @Override
    public ObjectPagedList<?> listByVictum(Pageable pageable, String userIdOrUsername) {

        Page<UniversalReport> universalReportPage;

        if (userIdOrUsername.matches("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")) {
            // userIdOrUsername is a UUID
            universalReportPage = urr.findAllByVictimUser_UserId(UUID.fromString(userIdOrUsername), pageable);
        } else {
            // userIdOrUsername is a username
            universalReportPage = urr.findAllByVictimUser_Username(userIdOrUsername, pageable);
        }

        return new ObjectPagedList<>(
                universalReportPage
                        .stream()
                        .map(universalReportMapper::UniversalReportToUniversalReportDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        universalReportPage.getPageable().getPageNumber(),
                        universalReportPage.getPageable().getPageSize(),
                        universalReportPage.getSort()),
                universalReportPage.getTotalElements()
        );
    }

//    UPDATE
    @Override
    public ObjectPagedList<?> listByCulprit(Pageable pageable, String userIdOrUsername) {

        Page<UniversalReport> universalReportPage;

        if (userIdOrUsername.matches("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")) {
            // userIdOrUsername is a UUID
            universalReportPage = urr.findAllByCulpritUser_UserId(UUID.fromString(userIdOrUsername), pageable);
        } else {
            // userIdOrUsername is a username
            universalReportPage = urr.findAllByCulpritUser_Username(userIdOrUsername, pageable);
        }

        return new ObjectPagedList<>(
                universalReportPage
                        .stream()
                        .map(universalReportMapper::UniversalReportToUniversalReportDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        universalReportPage.getPageable().getPageNumber(),
                        universalReportPage.getPageable().getPageSize(),
                        universalReportPage.getSort()),
                universalReportPage.getTotalElements()
        );
    }

//  UPDATE
    @Override
    public ObjectPagedList<?> listByResolver(Pageable pageable, String userIdOrUsername) {

        Page<UniversalReport> universalReportPage;

        if (userIdOrUsername.matches("[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}")) {
            // userIdOrUsername is a UUID
            universalReportPage = urr.findAllByResolvedBy_UserId(UUID.fromString(userIdOrUsername), pageable);
        } else {
            // userIdOrUsername is a username
            universalReportPage = urr.findAllByResolvedBy_Username(userIdOrUsername, pageable);
        }

        return new ObjectPagedList<>(
                universalReportPage
                        .stream()
                        .map(universalReportMapper::UniversalReportToUniversalReportDTO)
                        .collect(Collectors.toList()),
                PageRequest.of(
                        universalReportPage.getPageable().getPageNumber(),
                        universalReportPage.getPageable().getPageSize(),
                        universalReportPage.getSort()),
                universalReportPage.getTotalElements()
        );
    }

    @Override
    public void emailReportToAllAdmins(String subject, String body) {
        Role admin = roleRepository.findRoleByRoleName(UserRoles.ADMIN.name()).orElseThrow(
                () -> new NoSuchElementException("Role not found"));

        Set<User> users = userRepository.findAllByRolesIn(Set.of(admin));
        users.forEach(user -> {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(user.getEmail());
            mailMessage.setSubject(subject);
            mailMessage.setText(body);
            emailService.sendEmail(mailMessage);
        });
    }
}
