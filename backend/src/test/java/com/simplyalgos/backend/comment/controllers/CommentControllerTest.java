package com.simplyalgos.backend.comment.controllers;


import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.test.web.servlet.MockMvc;


import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
class CommentControllerTest {

    @Autowired
    protected MockMvc mockMvc;


    @WithAnonymousUser
    @Test
    @Disabled("Currently disabled")
    void listComments() throws Exception {
        mockMvc.perform(get("/comments/list")
                        .param("page", "0")
                        .param("size", "10")
                        .accept("application/json"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.content", hasSize(10)))
                .andExpect(jsonPath("$.numberOfElements", is(10)))
                .andExpect(jsonPath("$.pageable.pageSize", is(10)))
                .andExpect(jsonPath("$.pageable.pageNumber", is(0)));
    }

    @Test
    void listChildComments() {
    }

    @Test
    void createParentComment() {
    }

    @Test
    void createChildComment() {
    }

    @Test
    void updateComment() {
    }

    @Test
    void deleteComment() {
    }

    @Test
    void voteComment() {
    }

    @Test
    void reportComment() {
    }

    @Test
    void deleteVote() {
    }

    @Test
    void listVotesByPageIdAndUserId() {
    }
}