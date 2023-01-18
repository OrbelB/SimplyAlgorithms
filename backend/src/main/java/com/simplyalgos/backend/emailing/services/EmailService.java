package com.simplyalgos.backend.emailing.services;

import org.springframework.mail.SimpleMailMessage;

public interface EmailService {
    void sendEmail(SimpleMailMessage simpleMailMessage);
}
