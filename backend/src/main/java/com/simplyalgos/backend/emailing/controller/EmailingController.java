package com.simplyalgos.backend.emailing.controller;

import com.simplyalgos.backend.emailing.dtos.EmailResponse;
import com.simplyalgos.backend.emailing.services.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;

@CrossOrigin()
@Slf4j
@RequiredArgsConstructor
@RequestMapping("email")
@RestController
public class EmailingController {
    private final EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<?> sendEmail(@RequestBody EmailResponse emailResponse) {
        SimpleMailMessage sMailMessage = new SimpleMailMessage();
        sMailMessage.setFrom(emailResponse.getFrom());
        sMailMessage.setTo(emailResponse.getTo());
        sMailMessage.setSubject(emailResponse.getSubject());
        sMailMessage.setText(emailResponse.getBody());
        emailService.sendEmail(sMailMessage);
        return ResponseEntity.noContent().build();
    }

}
