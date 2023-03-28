package com.simplyalgos.backend.config;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailService;
import com.amazonaws.services.simpleemail.AmazonSimpleEmailServiceClientBuilder;
import io.awspring.cloud.ses.SimpleEmailServiceJavaMailSender;
import io.awspring.cloud.ses.SimpleEmailServiceMailSender;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.MailSender;
import org.springframework.mail.javamail.JavaMailSender;




@Profile("aws")
@Configuration
@Slf4j
public class AWSSESConfig {
    @Value("${cloud.aws.credentials.access-key}")
    private String awsAccessKey;

    @Value("${cloud.aws.credentials.private-key}")
    private String awsSecretKey;

    @Value("${cloud.aws.region.static}")
    private String region;

    //initializing and setting up the emailing services using aws credentials
    @Bean
    public AmazonSimpleEmailService amazonSimpleEmailService() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(awsAccessKey, awsSecretKey);
        log.debug("AWS SES credentials initialized");
        return AmazonSimpleEmailServiceClientBuilder
                .standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(region)
                .build();

    }

    // mail sender for spring boot app that has been configured to work with ses
    @Bean
    public MailSender mailSender(AmazonSimpleEmailService amazonSimpleEmailService) {
        return new SimpleEmailServiceMailSender(amazonSimpleEmailService);
    }

    // mail sender for java that works with ses
    @Bean
    public JavaMailSender javaMailSender(AmazonSimpleEmailService amazonSimpleEmailService) {
        return new SimpleEmailServiceJavaMailSender(amazonSimpleEmailService);
    }
}
