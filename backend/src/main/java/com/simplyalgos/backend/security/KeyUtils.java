package com.simplyalgos.backend.security;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;


/*rsa keys to encrypt and decrypt both refresh and access token*/
@Slf4j
@Component
public class KeyUtils {
    @Value("${jwt.access-token.public.key}")
    private RSAPublicKey accessTokenPublicKey;

    @Value("${jwt.access-token.private.key}")
    private RSAPrivateKey accessTokenPrivateKey;

    @Value("${jwt.refresh-token.public.key}")
    private RSAPublicKey refreshTokenPublicKey;

    @Value("${jwt.refresh-token.private.key}")
    private RSAPrivateKey refreshTokenPrivateKey;

    public RSAPublicKey getAccessTokenPublicKey() {
        return accessTokenPublicKey;
    }

    public RSAPrivateKey getAccessTokenPrivateKey() {
        return accessTokenPrivateKey;
    }

    public RSAPublicKey getRefreshTokenPublicKey() {
        return refreshTokenPublicKey;
    }

    public RSAPrivateKey getRefreshTokenPrivateKey() {
        return refreshTokenPrivateKey;
    }
}
