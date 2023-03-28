package com.simplyalgos.backend.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class ElementExistsException extends  RuntimeException {

    public ElementExistsException() {
        super();
    }

    public ElementExistsException(String message) {
        super(message);
    }

    public ElementExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public ElementExistsException(Throwable cause) {
        super(cause);
    }

    protected ElementExistsException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
