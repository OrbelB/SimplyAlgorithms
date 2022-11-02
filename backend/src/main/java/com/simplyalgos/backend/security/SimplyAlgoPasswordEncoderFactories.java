package com.simplyalgos.backend.security;

import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.*;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;

//override the default password encoders with bcrypt encryption with a cost of 12 to add extra security
//also allows noop password authentication in case we have password that has been stored without encryption
public class SimplyAlgoPasswordEncoderFactories {

    public static PasswordEncoder createDelegatingPasswordEncoder() {
        String encodingId = "bcrypt12";
        Map<String, PasswordEncoder> encoders = new HashMap<>();

        encoders.put(encodingId, new BCryptPasswordEncoder(12));
        encoders.put("bcrypt", new BCryptPasswordEncoder());
        encoders.put("pbkdf2", new Pbkdf2PasswordEncoder());
        encoders.put("scrypt", new SCryptPasswordEncoder());
        encoders.put("argon2", new Argon2PasswordEncoder());
        encoders.put("noop", NoOpPasswordEncoder.getInstance());
        return new DelegatingPasswordEncoder(encodingId, encoders);
    }

    //don't instantiate class
    private SimplyAlgoPasswordEncoderFactories() {
    }
}
