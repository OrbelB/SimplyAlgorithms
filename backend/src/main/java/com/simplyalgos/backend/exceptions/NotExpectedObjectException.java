package com.simplyalgos.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class NotExpectedObjectException extends RuntimeException {

    public NotExpectedObjectException() {
        super();
    }

    public NotExpectedObjectException(String message) {
        super(message);
    }

    public NotExpectedObjectException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotExpectedObjectException(Throwable cause) {
        super(cause);
    }

    protected NotExpectedObjectException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
