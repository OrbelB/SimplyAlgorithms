package com.simplyalgos.backend.bootstrap;

import com.nimbusds.jose.shaded.gson.GsonBuilder;
import com.simplyalgos.backend.chatty.domain.Chatty;
import com.simplyalgos.backend.chatty.repositories.ChattyRepository;
import com.simplyalgos.backend.comment.enums.CommentType;
import com.simplyalgos.backend.page.domains.Wiki;
import com.simplyalgos.backend.page.repositories.WikiRepository;
import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.enums.UserRoles;
import com.simplyalgos.backend.user.repositories.AuthorityRepository;
import com.simplyalgos.backend.user.repositories.RoleRepository;
import com.simplyalgos.backend.user.repositories.UserRepository;
import com.simplyalgos.backend.user.security.Authority;
import com.simplyalgos.backend.user.security.Role;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@RequiredArgsConstructor
@Slf4j
@Component
public class LoadData implements ApplicationListener<ContextRefreshedEvent> {
    private final WikiRepository wikiRepository;
    private final AuthorityRepository authorityRepository;

    private final ChattyRepository chattyRepository;
    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Value("${ADMIN_PASSWORD}")
    private String adminPassword;

    @Value("${ADMIN_EMAIL}")
    private String adminEmail;



    @Transactional
    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (!userRepository.existsByUsername("admin")) {
            loadDefaultUsers();
        }

        if (!wikiRepository.existsByWikiName("Main Category")) {
            loadDefaultTopicPages();
        }
    }

    private void loadDefaultTopicPages() {

        Map<String, Object> pageDescription = new GsonBuilder().create().fromJson("{\n" +
                "        \"blocks\": [\n" +
                "            {\n" +
                "                \"key\": \"2d4ek\",\n" +
                "                \"text\": \"This main category always has to be here\",\n" +
                "                \"type\": \"header-one\",\n" +
                "                \"depth\": 0,\n" +
                "                \"inlineStyleRanges\": [],\n" +
                "                \"entityRanges\": [],\n" +
                "                \"data\": {\n" +
                "                    \"text-align\": \"center\"\n" +
                "                }\n" +
                "            },\n" +
                "            {\n" +
                "                \"key\": \"evc2g\",\n" +
                "                \"text\": \"\",\n" +
                "                \"type\": \"unstyled\",\n" +
                "                \"depth\": 0,\n" +
                "                \"inlineStyleRanges\": [],\n" +
                "                \"entityRanges\": [],\n" +
                "                \"data\": {}\n" +
                "            },\n" +
                "            {\n" +
                "                \"key\": \"frdnn\",\n" +
                "                \"text\": \"sdafdas\",\n" +
                "                \"type\": \"unstyled\",\n" +
                "                \"depth\": 0,\n" +
                "                \"inlineStyleRanges\": [],\n" +
                "                \"entityRanges\": [],\n" +
                "                \"data\": {}\n" +
                "            },\n" +
                "            {\n" +
                "                \"key\": \"6dero\",\n" +
                "                \"text\": \"f yhjhgj\",\n" +
                "                \"type\": \"unstyled\",\n" +
                "                \"depth\": 0,\n" +
                "                \"inlineStyleRanges\": [],\n" +
                "                \"entityRanges\": [],\n" +
                "                \"data\": {}\n" +
                "            },\n" +
                "            {\n" +
                "                \"key\": \"f84o8\",\n" +
                "                \"text\": \"sad\",\n" +
                "                \"type\": \"unstyled\",\n" +
                "                \"depth\": 0,\n" +
                "                \"inlineStyleRanges\": [],\n" +
                "                \"entityRanges\": [],\n" +
                "                \"data\": {}\n" +
                "            },\n" +
                "            {\n" +
                "                \"key\": \"cgtjq\",\n" +
                "                \"text\": \"fghj\",\n" +
                "                \"type\": \"unstyled\",\n" +
                "                \"depth\": 0,\n" +
                "                \"inlineStyleRanges\": [],\n" +
                "                \"entityRanges\": [],\n" +
                "                \"data\": {}\n" +
                "            },\n" +
                "            {\n" +
                "                \"key\": \"60pdg\",\n" +
                "                \"text\": \"sda\",\n" +
                "                \"type\": \"unstyled\",\n" +
                "                \"depth\": 0,\n" +
                "                \"inlineStyleRanges\": [],\n" +
                "                \"entityRanges\": [],\n" +
                "                \"data\": {}\n" +
                "            },\n" +
                "            {\n" +
                "                \"key\": \"f9s1g\",\n" +
                "                \"text\": \"f\",\n" +
                "                \"type\": \"unstyled\",\n" +
                "                \"depth\": 0,\n" +
                "                \"inlineStyleRanges\": [],\n" +
                "                \"entityRanges\": [],\n" +
                "                \"data\": {}\n" +
                "            },\n" +
                "            {\n" +
                "                \"key\": \"5pft3\",\n" +
                "                \"text\": \"sad\",\n" +
                "                \"type\": \"unstyled\",\n" +
                "                \"depth\": 0,\n" +
                "                \"inlineStyleRanges\": [],\n" +
                "                \"entityRanges\": [],\n" +
                "                \"data\": {}\n" +
                "            },\n" +
                "            {\n" +
                "                \"key\": \"9fqti\",\n" +
                "                \"text\": \"fsadf\",\n" +
                "                \"type\": \"unstyled\",\n" +
                "                \"depth\": 0,\n" +
                "                \"inlineStyleRanges\": [],\n" +
                "                \"entityRanges\": [],\n" +
                "                \"data\": {}\n" +
                "            }\n" +
                "        ],\n" +
                "        \"entityMap\": {}\n" +
                "    }", Map.class);
        wikiRepository.save(
                Wiki.builder()
                        .isParentChild(CommentType.PARENT.label)
                        .wikiName("Main Category")
                        .description(pageDescription)
                        .build()
        );
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

        Role studentRole = roleRepository.save(Role.builder().roleName(UserRoles.STUDENT.name()).build());

        Role adminRole = roleRepository.save(Role.builder().roleName(UserRoles.ADMIN.name()).build());

        //can create / update topic pages & quiz's but cannot delete them
        Role teacherRole = roleRepository.save(Role.builder().roleName(UserRoles.TEACHER.name()).build());

        Role aIRole = roleRepository.save(Role.builder().roleName(UserRoles.AI.name()).build());

        aIRole.setAuthorities(new HashSet<>(Set.of(createForum, updateForum, readForum, deleteForum,
                updateUser, readUser, deleteUser, createVote, removeVote, createReport, removeReport,
                createComment, removeComment, updateComment, updateUserPassword, createTopic,
                removeTopic, updateTopic, createQuiz, updateQuiz, deleteQuiz, takeQuiz)));

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

        roleRepository.saveAll(Arrays.asList(studentRole, adminRole, teacherRole, aIRole));

        userRepository.save(
                User.builder()
                        .username("Chatty")
                        .password(passwordEncoder.encode(adminPassword))
                        .email(adminEmail)
                        .dob(Date.valueOf(LocalDate.of(2000, 1, 1)))
                        .firstName("Chatty")
                        .lastName("AI")
                        .profilePicture("https://cdn2.thecatapi.com/images/1.jpg")
                        .role(aIRole)
                        .build()
        );

        //add default user
        userRepository.save(
                User.builder()
                        .username("admin")
                        .password(passwordEncoder.encode(adminPassword))
                        .email(adminEmail)
                        .dob(Date.valueOf(LocalDate.of(2000, 1, 1)))
                        .firstName("admin_firstName")
                        .lastName("admin_lastName")
                        .profilePicture("https://cdn2.thecatapi.com/images/_8WxuPwzw.jpg")
                        .role(adminRole)
                        .build()
        );

        //add default chatty profile
        chattyRepository.save(
                Chatty.builder()
                        .chattyDesc("default profile")
                        .maxInputToken(400)
                        .maxOutputToken(400)
                        .delateSetting(4) //once an hour
                        .remainingDelays(4)
                        .maxReplies(5) //max number of forum questions it can answer per activation
                        .profileEnabled((short) 1)
                        .model("gpt-3.5-turbo")
                        .temperature(0.7)
                        .build()
        );
    }

}
