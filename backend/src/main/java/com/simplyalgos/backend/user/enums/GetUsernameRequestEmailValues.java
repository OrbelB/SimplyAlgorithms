package com.simplyalgos.backend.user.enums;

public enum GetUsernameRequestEmailValues {

    FROM("noreply@simplyalgorithms.com"),

    SUBJECT("Simply Algorithms username"),

    BODY("Hello, Your username is: \n");
    public final String label;

    GetUsernameRequestEmailValues(String label) {this.label = label;}
}
