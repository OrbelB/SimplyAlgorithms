package com.simplyalgos.backend.chatty.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Entity(name = "chatty_settings")
public class Chatty {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "chatty_id  ")
    private UUID chattyId;

    @Column(length = 512, name = "chatty_desc")
    private String chattyDesc;

    @Column(name = "max_input_token")
    private int maxInputToken;

    @Column(name = "max_output_token")
    private int maxOutputToken;

    @Column(name = "delay_setting")
    private int delateSetting;

    @Column(name = "remaining_delays")
    private int remainingDelays;

    @Column(name = "max_replies")
    int maxReplies;

    @Column(name = "profile_enabled")
    private short profileEnabled;

    @Column(name = "model", length = 128)
    private String model;

    @Column(name = "temperature")
    private double temperature;
}

//
//    CREATE TABLE chatty_settings (
//        chatty_id VARCHAR(36) NOT NULL,
//    chatty_desc VARCHAR(512) NOT NULL,
//    max_input_token INT NOT NULL DEFAULT 400,
//        max_output_token INT NOT NULL DEFAULT 400,
//        delay_setting INT NOT NULL DEFAULT 4,
//        remaining_delays INT NOT NULL,
//        max_replies INT NOT NULL DEFAULT 10,
//        profile_enabled TINYINT NOT NULL DEFAULT 0,
//        model VARCHAR(128) NOT NULL,
//        temperature DOUBLE NOT NULL DEFAULT .70
//        );