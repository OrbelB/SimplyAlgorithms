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
        Authority readUser = authorityRepository.save(Authority.builder().permission("user.read").build());
        Authority deleteUser = authorityRepository.save(Authority.builder().permission("user.delete").build());
        //forum auths
        Authority createForum = authorityRepository.save(Authority.builder().permission("forum.create").build());
        Authority updateForum = authorityRepository.save(Authority.builder().permission("forum.update").build());
        Authority readForum = authorityRepository.save(Authority.builder().permission("forum.read").build());
        Authority deleteForum = authorityRepository.save(Authority.builder().permission("forum.delete").build());

        Role studentRole = roleRepository.save(Role.builder().roleName("STUDENT").build());

        Role adminRole = roleRepository.save(Role.builder().roleName("ADMIN").build());

        adminRole.setAuthorities(new HashSet<>(Set.of(createForum, updateForum, readForum, deleteForum, updateUser, readUser, deleteUser, usersCRUD)));
        studentRole.setAuthorities(new HashSet<>(Set.of(createForum, updateForum, readForum, deleteForum, updateUser, readUser, deleteUser)));

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
                        .profilePicture("this is a picture link")
                        .role(adminRole)
                        .build()
        );
    }
}
