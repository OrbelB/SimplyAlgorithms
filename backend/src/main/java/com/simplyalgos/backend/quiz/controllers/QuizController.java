package com.simplyalgos.backend.quiz.controllers;

import com.simplyalgos.backend.quiz.dtos.DeleteQuizDTO;
import com.simplyalgos.backend.quiz.dtos.FullQuizDTO;
import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import com.simplyalgos.backend.quiz.security.CreateQuizPermission;
import com.simplyalgos.backend.quiz.security.DeleteQuizPermission;
import com.simplyalgos.backend.quiz.security.TakeQuizPermission;
import com.simplyalgos.backend.quiz.security.UpdateQuizPermission;
import com.simplyalgos.backend.quiz.services.*;
import com.simplyalgos.backend.tag.dto.TagDTO;
import com.simplyalgos.backend.utils.StringUtils;
import io.swagger.v3.core.util.Json;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

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
    public ResponseEntity<?> getQuizList(
            @RequestParam(name = "page", defaultValue = "0", required = false)  int page,
            @RequestParam(name = "size", defaultValue = "5", required = false) int size,
            @RequestParam(name = "filterBy", required = false) String filterBy) {
        if(StringUtils.isNotNullAndEmptyOrBlank(filterBy)){
            log.debug("Filtered quiz");
            return ResponseEntity.ok(quizService.listQuizPageWithTag(PageRequest.of(page,size),filterBy));
        }
        else{
            return ResponseEntity.ok(quizService.listQuizPages(PageRequest.of(page, size)));
        }
    }

    //will retrieve the whole quiz
    @TakeQuizPermission
    @GetMapping("/{quizId}")
    public ResponseEntity<?> getQuiz(@PathVariable String quizId) {
        return ResponseEntity.ok(quizService.getFullQuiz(UUID.fromString(quizId)));
    }

    @GetMapping("/user_history/{userId}")
    public ResponseEntity<?> getUserQuizHistory(@PathVariable String userId) {
        return null;
    }

    @GetMapping(path = "/avgQuizScore", consumes = "application/json")
    public ResponseEntity<?> calculateAverageQuizScore(@RequestBody QuizDTO quizDTO) {
        return ResponseEntity.ok(takeQuizService.getAverageQuizScore(quizDTO.getQuizId()));
    }


    //    Tested & passed
//    Front end must make sure at least one question is correct
    @CreateQuizPermission
    @PostMapping(path = "/create", consumes = "application/json")
    public ResponseEntity<?> createQuiz(@RequestBody FullQuizDTO fullQuizDTO) {
        log.debug("Creating a new Quiz: " + fullQuizDTO.getQuizDTO().getTag().getTag());
        log.debug("questions" + Json.pretty(fullQuizDTO.getQuizQuestionDTO()));
        log.debug("number of questions: " + fullQuizDTO.getQuizQuestionDTO().size());

        var response = ResponseEntity.status(HttpStatus.CREATED)
                .body(quizService.createQuizWithFullQuizDTO(fullQuizDTO));
        List<QuizQuestionDTO> quizQuestionDTOList = quizQuestionService
                .createAllQuizQuestionAndAnswers(fullQuizDTO.getQuizQuestionDTO(), response.getBody());

        for (QuizQuestionDTO quizQuestionDTO : quizQuestionDTOList) {
            questionAnswerService.saveAllQuizQuestionAnswers(quizQuestionDTO);
        }
        return response;
    }


    @DeleteQuizPermission
    @PostMapping(path = "/delete", consumes = "application/json")
    public ResponseEntity<?> deleteQuiz(@RequestBody DeleteQuizDTO deleteQuizDTO) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(quizService.deleteQuiz(deleteQuizDTO.getQuizId()));
    }

    @UpdateQuizPermission
    @PostMapping(path = "/update", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateFullQuiz(@RequestBody FullQuizDTO fullQuizDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(quizService.updateFullQuiz(fullQuizDTO));
    }
//    SLOW AND STEADY NOW

    @TakeQuizPermission
    @PostMapping("/submitQuiz")
    public ResponseEntity<?> submitQuiz(String quizDTO) {
        return null;
    }


}
