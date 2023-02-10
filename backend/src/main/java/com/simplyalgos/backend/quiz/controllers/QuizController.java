package com.simplyalgos.backend.quiz.controllers;

import com.simplyalgos.backend.tag.domains.Tag;
import com.simplyalgos.backend.tag.dto.TagDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@CrossOrigin
@RequestMapping("forums")
@Slf4j
@RestController
//TO DO: create the permissions for quizs
// only logged in users may take a quiz
// not finsihed
public class QuizController {
//    @GetMapping("/list")
//    public ResponseEntity<?> getQuizList(TagDTO tag){
//        return null;
//    }
//
//    @GetMapping("/{quizId}")
//    public ResponseEntity<?> getQuiz(@PathVariable String quizId){
//        return null;
//    }
//
//    @GetMapping("/{userId}")
//    public ResponseEntity<?> getUserQuizHistory(@PathVariable String userId){
//        return null;
//    }
//    @GetMapping("/avgQuizScore")
//    public ResponseEntity<?> calculateAverageQuizScore(String userId){
//        return null;
//    }
//
//    //update to have quizDTO as an input
//    @PostMapping(path="/create", consumes = "application/json")
//    public ResponseEntity<?> createQuiz(){
//        return null;
//    }
//
//    @PostMapping(path = "/delete")
//    public ResponseEntity<?> deleteQuiz(){
//        return null;
//    }
//
//    @PostMapping(path="/update", consumes = "application/json", produces = "application/json" )
//    public ResponseEntity<?> updateQuiz(){
//        return null;
//    }
//
//
////    this will be updated to QuizDTO and will be given a permission
//    @PostMapping("/submitQuiz")
//    public ResponseEntity<?> submitQuiz(String quizDTO){
//        return null;
//    }


}
