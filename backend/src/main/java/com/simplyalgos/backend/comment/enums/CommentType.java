package com.simplyalgos.backend.comment.enums;

public enum CommentType {
    PARENT("parent"),
    CHILD("child");

    public final String label;

    CommentType(String label) {
        this.label = label;
    }
}
