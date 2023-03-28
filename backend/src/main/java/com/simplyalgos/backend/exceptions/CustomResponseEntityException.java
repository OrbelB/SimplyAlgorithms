package com.simplyalgos.backend.exceptions;

import jakarta.annotation.Nullable;
import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.validation.BindException;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class CustomResponseEntityException extends ResponseEntityExceptionHandler {


    @ExceptionHandler(Exception.class)
    @Nullable
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) throws Exception {
        ErrorHandlerDetails.ErrorHandlerDetailsBuilder errorHandlerDetails = ErrorHandlerDetails
                .builder()
                .timestamp(LocalDateTime.now())
                .message(ex.getMessage())
                .details(request.getDescription(false));
        if (ex instanceof ErrorResponseException subEx) {
            errorHandlerDetails.status(subEx.getStatusCode().value());
            return new ResponseEntity<>(errorHandlerDetails.build(), subEx.getStatusCode());
        }  else if (ex instanceof HttpMediaTypeNotSupportedException subEx) {
            errorHandlerDetails.status(subEx.getStatusCode().value());
            return new ResponseEntity<>(errorHandlerDetails.build(), subEx.getStatusCode());
        } else if (ex instanceof HttpMediaTypeNotAcceptableException subEx) {
            errorHandlerDetails.status(subEx.getStatusCode().value());
            return new ResponseEntity<>(errorHandlerDetails.build(), subEx.getStatusCode());
        } else if (ex instanceof MissingPathVariableException subEx) {
            errorHandlerDetails.status(subEx.getStatusCode().value());
            return new ResponseEntity<>(errorHandlerDetails.build(), subEx.getStatusCode());
        } else if (ex instanceof MissingServletRequestParameterException subEx) {
            errorHandlerDetails.status(subEx.getStatusCode().value());
            return new ResponseEntity<>(errorHandlerDetails.build(), subEx.getStatusCode());
        } else if (ex instanceof MissingServletRequestPartException subEx) {
            errorHandlerDetails.status(subEx.getStatusCode().value());
            return new ResponseEntity<>(errorHandlerDetails.build(), subEx.getStatusCode());
        } else if (ex instanceof ServletRequestBindingException subEx) {
            errorHandlerDetails.status(subEx.getStatusCode().value());
            return new ResponseEntity<>(errorHandlerDetails.build(), subEx.getStatusCode());
        } else if (ex instanceof MethodArgumentNotValidException subEx) {
            errorHandlerDetails.status(subEx.getStatusCode().value());
            return new ResponseEntity<>(errorHandlerDetails.build(), subEx.getStatusCode());
        } else if (ex instanceof NoHandlerFoundException subEx) {
            errorHandlerDetails.status(subEx.getStatusCode().value());
            return new ResponseEntity<>(errorHandlerDetails.build(), subEx.getStatusCode());
        } else if (ex instanceof AsyncRequestTimeoutException subEx) {
            errorHandlerDetails.status(subEx.getStatusCode().value());
            return new ResponseEntity<>(errorHandlerDetails.build(), subEx.getStatusCode());

        }else {
            if (ex instanceof ConversionNotSupportedException theEx) {
                return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.INTERNAL_SERVER_ERROR);
            } else if (ex instanceof TypeMismatchException theEx) {
                return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.BAD_REQUEST);
            } else if (ex instanceof HttpMessageNotReadableException theEx) {
                return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.BAD_REQUEST);
            } else if (ex instanceof HttpMessageNotWritableException theEx) {
                return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.INTERNAL_SERVER_ERROR);
            } else if (ex instanceof BindException theEx) {
                return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.BAD_REQUEST);
            }
        }
        return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({ElementNotFoundException.class, PasswordsDontMatchException.class, TokenExpireException.class,
            NotExpectedObjectException.class, UserNotAuthorizedException.class, ElementExistsException.class})
    public final ResponseEntity<?> handleCustomExceptions(WebRequest request, Exception ex) throws Exception{
        ErrorHandlerDetails.ErrorHandlerDetailsBuilder errorHandlerDetails = ErrorHandlerDetails
                .builder()
                .timestamp(LocalDateTime.now())
                .message(ex.getMessage())
                .details(request.getDescription(false));
        if(ex instanceof  ElementNotFoundException theEx) {
            errorHandlerDetails.status(HttpStatus.NOT_FOUND.value());
            return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.NOT_FOUND);
        } else if (ex instanceof PasswordsDontMatchException theEx) {
            errorHandlerDetails.status(HttpStatus.FORBIDDEN.value());
            return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.FORBIDDEN);
        }
        else if (ex instanceof TokenExpireException theEx ){
            errorHandlerDetails.status(HttpStatus.UNAUTHORIZED.value());
            return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.UNAUTHORIZED);
        }else if ( ex instanceof NotExpectedObjectException theEx){
            errorHandlerDetails.status(HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.BAD_REQUEST);
        }else if (ex instanceof UserNotAuthorizedException theEx) {
            errorHandlerDetails.status(HttpStatus.UNAUTHORIZED.value());
            return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.UNAUTHORIZED);
        }else if (ex instanceof ElementExistsException theEx) {
            errorHandlerDetails.status(HttpStatus.CONFLICT.value());
            return new ResponseEntity<>(errorHandlerDetails.build(), HttpStatus.CONFLICT);
        }else {
            throw ex;
        }
    }
}
