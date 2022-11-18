package com.simplyalgos.backend.bootstrap;

import com.simplyalgos.backend.user.*;
import com.simplyalgos.backend.user.security.Authority;
import com.simplyalgos.backend.user.security.AuthorityRepository;
import com.simplyalgos.backend.user.security.Role;
import com.simplyalgos.backend.user.security.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@RequiredArgsConstructor
@Component
public class LoadData implements ApplicationListener<ContextRefreshedEvent> {
    private final AuthorityRepository authorityRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (userRepository.findByUsername("admin").isEmpty()) {
            loadDefaultUsers();
        }
    }

    private void loadDefaultUsers() {

        //user auth
        Authority usersCRUD = authorityRepository.save(Authority.builder().permission("users.crud").build());
        Authority updateUser = authorityRepository.save(Authority.builder().permission("user.update").build());
        Authority updateUserPassword = authorityRepository.save(Authority.builder().permission("user.update-password").build());
        Authority readUser = authorityRepository.save(Authority.builder().permission("user.read").build());
        Authority deleteUser = authorityRepository.save(Authority.builder().permission("user.delete").build());
        //forum auths
        Authority createForum = authorityRepository.save(Authority.builder().permission("forum.create").build());
        Authority updateForum = authorityRepository.save(Authority.builder().permission("forum.update").build());
        Authority readForum = authorityRepository.save(Authority.builder().permission("forum.read").build());
        Authority deleteForum = authorityRepository.save(Authority.builder().permission("forum.delete").build());

        Authority createVote = authorityRepository.save(Authority.builder().permission("vote.create").build());
        Authority removeVote = authorityRepository.save(Authority.builder().permission("vote.remove").build());

        Authority createReport = authorityRepository.save(Authority.builder().permission("report.create").build());
        Authority removeReport = authorityRepository.save(Authority.builder().permission("report.remove").build());
        Authority updateReport = authorityRepository.save(Authority.builder().permission("report.update").build());
        Authority readReport = authorityRepository.save(Authority.builder().permission("report.read").build());

        Authority createTopic = authorityRepository.save(Authority.builder().permission("topic.create").build());
        Authority removeTopic = authorityRepository.save(Authority.builder().permission("topic.remove").build());
        Authority updateTopic = authorityRepository.save(Authority.builder().permission("topic.update").build());

        Authority createComment = authorityRepository.save(Authority.builder().permission("comment.create").build());
        Authority removeComment = authorityRepository.save(Authority.builder().permission("comment.remove").build());
        Authority updateComment = authorityRepository.save(Authority.builder().permission("comment.update").build());

        Role studentRole = roleRepository.save(Role.builder().roleName("STUDENT").build());

        Role adminRole = roleRepository.save(Role.builder().roleName("ADMIN").build());

        adminRole.setAuthorities(new HashSet<>(Set.of(createForum,
                updateForum, readForum, deleteForum,
                updateUser, readUser, deleteUser,
                usersCRUD, createVote, removeVote,
                createReport, removeReport, updateReport, readReport, createTopic,
                removeTopic, updateTopic, createComment, removeComment, updateComment, updateUserPassword)));
        studentRole.setAuthorities(new HashSet<>(Set.of(createForum, updateForum, readForum, deleteForum,
                updateUser, readUser, deleteUser, createVote, removeVote, createReport, removeReport,
                createComment, removeComment, updateComment, updateUserPassword)));

        roleRepository.saveAll(Arrays.asList(studentRole, adminRole));

        //add default user
        userRepository.save(
                User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode("admin"))
                        .email("this@email")
                        .dob(Date.valueOf(LocalDate.of(2000, 1, 1)))
                        .firstName("admin_name")
                        .lastName("admin_lastName")
                        .profilePicture("https://cdn2.thecatapi.com/images/_8WxuPwzw.jpg")
                        .role(adminRole)
                        .build()
        );
    }
}
