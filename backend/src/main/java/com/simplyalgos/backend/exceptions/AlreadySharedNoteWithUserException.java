package com.simplyalgos.backend.exceptions;

public class AlreadySharedNoteWithUserException extends RuntimeException{
    public AlreadySharedNoteWithUserException(String message){super(message);}
}
