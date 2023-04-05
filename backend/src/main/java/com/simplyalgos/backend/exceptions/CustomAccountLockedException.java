package com.simplyalgos.backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.annotation.ResponseStatus;


@ResponseStatus(HttpStatus.FORBIDDEN)
public class CustomAccountLockedException extends LockedException {
    public CustomAccountLockedException(String msg) {
        super(msg);
    }

    public CustomAccountLockedException(String msg, Throwable cause) {
        super(msg, cause);
    }
}
