package com.simplyalgos.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class TokenExpireException extends RuntimeException{
    public TokenExpireException() {
        super();
    }

    public TokenExpireException(String message) {
        super(message);
    }

    public TokenExpireException(String message, Throwable cause) {
        super(message, cause);
    }

    public TokenExpireException(Throwable cause) {
        super(cause);
    }

    protected TokenExpireException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
