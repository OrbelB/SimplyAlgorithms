package com.simplyalgos.backend.emailing.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Slf4j
@Service
public class EmailServiceImpl implements EmailService {

    private final MailSender mailSender;

    @Override
    public void sendEmail(SimpleMailMessage simpleMailMessage) {
        mailSender.send(simpleMailMessage);
    }
}
