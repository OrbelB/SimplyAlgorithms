package com.simplyalgos.backend.bootstrap;

import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.repositories.TopicRepository;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.security.Authority;
import com.simplyalgos.backend.user.security.AuthorityRepository;
import com.simplyalgos.backend.user.security.Role;
import com.simplyalgos.backend.user.security.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import jakarta.transaction.Transactional;
import java.sql.Date;
import java.text.MessageFormat;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Component
public class LoadData implements ApplicationListener<ContextRefreshedEvent> {
    private final AuthorityRepository authorityRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final TopicRepository topicRepository;

    @Transactional
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {

        if (userRepository.findByUsername("admin").isEmpty()) {
            loadDefaultUsers();
        }

        if(topicRepository.findById(UUID.fromString("54e9d8be-f123-4360-9c76-0c4c2ccd99eb")).isEmpty()){
            loadDefaultTopicPages();
        }

    }

    private void loadDefaultTopicPages() {
        topicRepository.save(
                Topic.builder()
                        .pageId(UUID.fromString("3ba9a5c8-a328-4c88-80e0-57872ed56bde"))
                        .downVotes(0)
                        .upVotes(0)
                        .video("template")
                        .timeComplexity("template")
                        .runningTime("template")
                        .explanation("explanation")
                        .title("Bubble Sort")
                        .downVotes(0)
                        .build()
        );


        topicRepository.save(
                Topic.builder()
                        .pageId(UUID.fromString("7940b97e-d662-4c19-a2bc-2cd74f3fe25c"))
                        .downVotes(0)
                        .upVotes(0)
                        .video("template")
                        .timeComplexity("template")
                        .runningTime("template")
                        .explanation("explanation")
                        .title("Binary Search Trees")
                        .downVotes(0)
                        .build()
        );

        topicRepository.save(
                Topic.builder()
                        .pageId(UUID.fromString("c9fc9f60-6468-45ed-ab1f-5463f4b72865"))
                        .downVotes(0)
                        .upVotes(0)
                        .video("template")
                        .timeComplexity("template")
                        .runningTime("template")
                        .explanation("explanation")
                        .title("Arrays")
                        .downVotes(0)
                        .build()
        );

        topicRepository.save(
                Topic.builder()
                        .pageId(UUID.fromString("54e9d8be-f123-4360-9c76-0c4c2ccd99eb"))
                        .downVotes(0)
                        .upVotes(0)
                        .video("template")
                        .timeComplexity("template")
                        .runningTime("template")
                        .explanation("explanation")
                        .title("BFS")
                        .downVotes(0)
                        .build()
        );
        log.debug(MessageFormat.format("the current loaded pages are {0}", topicRepository.findAll().size()));
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

        //quiz auth
        Authority createQuiz = authorityRepository.save(Authority.builder().permission("quiz.create").build());
        Authority updateQuiz = authorityRepository.save(Authority.builder().permission("quiz.update").build());
        Authority deleteQuiz = authorityRepository.save(Authority.builder().permission("quiz.delete").build());
        Authority takeQuiz = authorityRepository.save(Authority.builder().permission("quiz.take").build());

        Role studentRole = roleRepository.save(Role.builder().roleName("STUDENT").build());

        Role adminRole = roleRepository.save(Role.builder().roleName("ADMIN").build());

        //can create / update topic pages & quizes but cannot delete them
        Role teacherRole = roleRepository.save(Role.builder().roleName("TEACHER").build());

        adminRole.setAuthorities(new HashSet<>(Set.of(createForum,
                updateForum, readForum, deleteForum,
                updateUser, readUser, deleteUser,
                usersCRUD, createVote, removeVote,
                createReport, removeReport, updateReport, readReport, createTopic,
                removeTopic, updateTopic, createComment, removeComment, updateComment, updateUserPassword,
                createQuiz, updateQuiz, deleteQuiz, takeQuiz)));

        studentRole.setAuthorities(new HashSet<>(Set.of(createForum, updateForum, readForum, deleteForum,
                updateUser, readUser, deleteUser, createVote, removeVote, createReport, removeReport,
                createComment, removeComment, updateComment, updateUserPassword,
                takeQuiz)));

        teacherRole.setAuthorities(new HashSet<>(Set.of(createForum, updateForum, readForum, deleteForum,
                updateUser, readUser, deleteUser, createVote, removeVote, createReport, removeReport,
                createComment, removeComment, updateComment, updateUserPassword, createTopic,
                updateTopic, createQuiz, updateQuiz, takeQuiz, deleteQuiz)));

        roleRepository.saveAll(Arrays.asList(studentRole, adminRole, teacherRole));

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
