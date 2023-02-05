package com.simplyalgos.backend.user.enums;

public enum NotificationMessage {
    PASSWORD_UPDATE {
        public String message(short quantity) {
            return "Your password has been updated!";
        }
    }, REPLY {
        public String message(short quantity) {
            if(quantity == 1) {
                return "You have 1 new reply";
            }
            return "You have " + quantity + " new replies";
        }
    }, FORUM {
        public String message(short quantity) {
            return "You have " + quantity + " new updates on your post.";
        }
    }, ACCOUNT_CHANGE {
        public String message(short quantity) {
            return "You have recently made new changes to your account.";
        }
    }, SYSTEM_UPDATE {
        public String message(short quantity) {
            return "TODO";
        }
    };
    public abstract String message(short quantity);
}
