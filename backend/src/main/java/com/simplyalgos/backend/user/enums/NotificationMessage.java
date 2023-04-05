package com.simplyalgos.backend.user.enums;

public enum NotificationMessage {
    PASSWORD_UPDATE {

        public <T> String message(T quantity) {
            return "Your password has been updated!";
        }

    }, REPLY {
        public <T>  String message(T quantity) {
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
            return "You have been promoted to a new role.";
        }
    }, ROLE_REQUEST {
        public <T> String message(T username) {
            return username + " requested to be promoted to Teacher";
        }
    };

    public abstract <T>  String message(T request);
}
