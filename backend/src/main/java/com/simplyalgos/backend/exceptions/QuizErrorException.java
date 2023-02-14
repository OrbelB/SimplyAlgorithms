package com.simplyalgos.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class QuizErrorException extends RuntimeException{

    public QuizErrorException(String message) {super(message);}

}
