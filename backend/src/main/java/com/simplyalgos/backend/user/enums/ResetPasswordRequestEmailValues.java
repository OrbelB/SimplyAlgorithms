package com.simplyalgos.backend.user.enums;

public enum ResetPasswordRequestEmailValues {

    FROM("noreply@simplyalgorithms.com"),

    SUBJECT("Simply Algorithms password reset"),

    BODY("A password reset request was made, please click on the link to reset your password, If you hanvt made such request please ignore this email");
    public final String label;

    ResetPasswordRequestEmailValues(String label) {
        this.label = label;
    }

}
