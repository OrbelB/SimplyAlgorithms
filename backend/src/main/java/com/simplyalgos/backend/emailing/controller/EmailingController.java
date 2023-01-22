package com.simplyalgos.backend.emailing.controller;

import com.simplyalgos.backend.emailing.dtos.EmailResponse;
import com.simplyalgos.backend.emailing.services.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

import java.awt.font.TextMeasurer;
import java.text.MessageFormat;

@CrossOrigin()
@Slf4j
@RequiredArgsConstructor
@RequestMapping("email")
@RestController
public class EmailingController {
    private final EmailService emailService;

    @PostMapping(value = "/send", consumes = "application/json")
    public ResponseEntity<?> sendEmail(@RequestBody EmailResponse emailResponse) {
        log.debug(MessageFormat.format("object gotten from email reponse {0}", emailResponse.getBody()));
        SimpleMailMessage sMailMessage = new SimpleMailMessage();
        sMailMessage.setFrom(emailResponse.getFrom());
        sMailMessage.setTo(emailResponse.getTo());
        sMailMessage.setSubject(emailResponse.getSubject());
        sMailMessage.setText(emailResponse.getBody());
        emailService.sendEmail(sMailMessage);
        return ResponseEntity.noContent().build();
    }

}
