package com.simplyalgos.backend.user.enums;

public enum NotificationMessage {
    PASSWORD_UPDATE {
        public <T> String message(T quantity) {
            return "Your password has been updated!";
        }

    }, REPLY {
        public <T> String message(T quantity) {
            if (quantity instanceof Short && (Short) quantity == 1) {
                return "You have 1 new reply";
            }
            return "You have " + quantity + " new replies";
        }
    }, FORUM {
        public <T> String message(T quantity) {
            if (quantity instanceof Short && (Short) quantity == 1) {
                return "You have 1 new update on your post.";
            }
            return "You have " + quantity + " new updates on your post.";
        }
    }, ACCOUNT_CHANGE {
        public <T> String message(T quantity) {
            return "You have recently made new changes to your account.";
        }
    }, SYSTEM_UPDATE {
        public <T> String message(T quantity) {
            return "TODO";
        }
    }, ROLE_CHANGE {
        public <T> String message(T role) {
            return "You have been promoted to " + role + ".";
        }
    }, ROLE_REQUEST {
        public <T> String message(T message) {
            return message.toString();
        }
    },
//     ------------------------------
    PROFANITY_REPORT {
        public <T> String message(T message){return  "REPORT: " + message;}
    }, INCORRECT_INFORMATION_REPORT {
        public <T> String message(T message){return "REPORT: " + message;}
    }, ERROR_REPORT {
        public <T> String message(T message){return "REPORT:  " + message;}
    }, OTHER_REPORT {
        public <T> String message(T message) {return "REPORT RESPONSE " + message;}
    }, REPORT_RESOLVED { //to send to the user
        public <T> String message(T resolveNote){return resolveNote + " ";}
    };
//    ,USER_HAS_RECEIVED_NOTE{
//
//    }, SHARED_USER_UPDATED_NOTE{
//
//    };
    public abstract <T> String message(T request);
}
