package com.simplyalgos.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class PasswordsDontMatchException  extends RuntimeException {
    public PasswordsDontMatchException() {
        super();
    }

    public PasswordsDontMatchException(String message) {
        super(message);
    }

    public PasswordsDontMatchException(String message, Throwable cause) {
        super(message, cause);
    }

    public PasswordsDontMatchException(Throwable cause) {
        super(cause);
    }

    public PasswordsDontMatchException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
