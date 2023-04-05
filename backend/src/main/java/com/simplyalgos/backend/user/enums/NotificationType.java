package com.simplyalgos.backend.user.enums;

public enum NotificationType {
    ACCOUNT_CHANGES("account_changes"),
    REPLIES_NOTIFICATION("replies_notification"),
    POST_LIKES("post_likes"),
    POST_REPLIES("post_replies"),
    SPECIAL_UPDATES("special_updates"),

    ADMIN_NOTIFICATION("admin_notification");

    private final String type;

    NotificationType(String type) {
        this.type =  type;
    }
    @Override
    public String toString(){
        return this.type;
    }

}
