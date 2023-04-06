package com.simplyalgos.backend.universalReport.enums;

public enum UniversalReportCategories {
    PROFANITY_REPORT("profanity"),
    INCORRECT_INFORMATION_REPORT("incorrectInfo"),
    ERROR_REPORT("error"),
    OTHER_REPORT("other");
    private final String type;

    UniversalReportCategories(String type) {this.type = type;}

    @Override
    public String toString(){
        return this.type;
    }
}
