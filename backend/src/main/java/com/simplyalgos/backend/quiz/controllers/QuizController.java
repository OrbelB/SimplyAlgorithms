package com.simplyalgos.backend.quiz.controllers;

import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.quiz.security.CreateQuizPermission;
import com.simplyalgos.backend.quiz.security.DeleteQuizPermission;
import com.simplyalgos.backend.quiz.security.TakeQuizPermission;
import com.simplyalgos.backend.quiz.security.UpdateQuizPermission;
import com.simplyalgos.backend.quiz.services.*;
import com.simplyalgos.backend.tag.dto.TagDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("quiz")
@Slf4j
@RestController
//TO DO: create the permissions for quizs
// only logged-in users may take a quiz
// not finsihed
public class QuizController {


    private final QuizService quizService;
    private final TakeQuizService takeQuizService;
    private final QuizQuestionAnswerService questionAnswerService;
    private final QuizQuestionService quizQuestionService;

    //need to pass in the tags
    //will retrieve the quiz pages
    @GetMapping("/list")
    public ResponseEntity<?> getQuizList(TagDTO tag){
        return null;
    }

    //will retrieve the whole quiz
    @TakeQuizPermission
    @GetMapping("/{quizId}")
    public ResponseEntity<?> getQuiz(@PathVariable String quizId){
        return null;
    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserQuizHistory(@PathVariable String userId){
        return null;
    }

    @GetMapping("/avgQuizScore")
    public ResponseEntity<?> calculateAverageQuizScore(String userId){
        return null;
    }


//    will be getting a quizDTO
    @CreateQuizPermission
    @PostMapping(path="/create", consumes = "application/json")
    public ResponseEntity<?> createQuiz(@RequestBody QuizDTO quizDTO){
        log.info("Creating a new Quiz: " + quizDTO.getTitle());
        return ResponseEntity.status(HttpStatus.CREATED).body(quizService.createQuiz(quizDTO));
    }

//    Will be getting a quizQuestionDTO
    @CreateQuizPermission
    @PostMapping(path="/addQuestion", consumes = "application/json")
    public ResponseEntity<?> createQuiz(){
        return null;
    }


    @DeleteQuizPermission
    @PostMapping(path = "/delete")
    public ResponseEntity<?> deleteQuiz(){
        return null;
    }

    @UpdateQuizPermission
    @PostMapping(path="/update", consumes = "application/json", produces = "application/json" )
    public ResponseEntity<?> updateQuiz(){
        return null;
    }

    @TakeQuizPermission
    @PostMapping("/submitQuiz")
    public ResponseEntity<?> submitQuiz(String quizDTO){
        return null;
    }


}
