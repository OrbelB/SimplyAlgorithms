package com.simplyalgos.backend.security;

import com.simplyalgos.backend.user.domains.User;
import com.simplyalgos.backend.user.security.Role;
import com.simplyalgos.backend.web.dtos.TokenDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Component;

import java.text.MessageFormat;
import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Set;

import static java.util.stream.Collectors.joining;

//generate the access and refresh token
@Slf4j
@RequiredArgsConstructor
@Component
public class TokenGenerator {

    private final JwtEncoder accessTokenEncoder;
    private JwtEncoder refreshTokenEncoder;

    @Autowired
    @Qualifier("jwtRefreshTokenEncoder")
    protected void setRefreshTokenEncoder(JwtEncoder refreshTokenEncoder) {
        this.refreshTokenEncoder = refreshTokenEncoder;
    }

    private JwtClaimsSet createJwtClaimSet(String subject, String scope, ChronoUnit chronoUnit, long duration) {
        Instant now = Instant.now();
        return JwtClaimsSet.builder()
                .issuer("SimplyAlgos.com")
                .issuedAt(now)
                .expiresAt(now.plus(duration, chronoUnit))
                .subject(subject)
                .claim("roles", scope)
                .build();

    }

    private String createAccessToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Instant now = Instant.now();

        String roleScope = user.getRoles().stream().map(Role::getRoleName).map(role -> "ROLE_" + role).collect(joining(" "));

        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(joining(" "));

        scope = scope + " " + roleScope;

        JwtClaimsSet claimsSet = createJwtClaimSet(user.getUserId().toString(), scope, ChronoUnit.DAYS, 1);

        return accessTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    private String createAccessTokenizeJwt(Authentication authentication) {
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(joining(" "));
        JwtClaimsSet claimsSet = createJwtClaimSet(authentication.getName(), scope, ChronoUnit.DAYS, 1);
        return accessTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    private String createRefreshToken(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Instant now = Instant.now();

        Set<Role> roles = user.getRoles();

        String roleScope = roles.stream().map(Role::getRoleName).map(role -> "ROLE_" + role)
                .collect(joining(" "));


        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)

                .collect(joining(" "));

        scope = scope + " " + roleScope;

        JwtClaimsSet claimsSet = createJwtClaimSet(user.getUserId().toString(), scope, ChronoUnit.DAYS, 30);

        return refreshTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    private String createRefreshTokenizeJwt(Authentication authentication) {
        Instant now = Instant.now();
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(joining(" "));

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("SimplyAlgos.com")
                .issuedAt(now)
                .expiresAt(now.plus(30, ChronoUnit.DAYS))
                .subject(authentication.getName())
                .claim("roles", scope)
                .build();

        return refreshTokenEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

    public TokenDTO createToken(Authentication authentication) {
        if (!((authentication.getPrincipal() instanceof User user))) {
            TokenDTO tokenDTO = new TokenDTO();
            tokenDTO.setUserId(authentication.getName());
            tokenDTO.setAccessToken(createAccessTokenizeJwt(authentication));
            String refreshToken;
            if (authentication.getCredentials() instanceof Jwt jwt) {
                Instant expiresAt = jwt.getExpiresAt();
                Duration duration = Duration.between(Instant.now(), expiresAt);
                long daysUntilExpired = duration.toDays();
                if (daysUntilExpired < 2) {
                    refreshToken = createRefreshTokenizeJwt(authentication);
                } else {
                    refreshToken = jwt.getTokenValue();
                }

            } else {
                refreshToken = createRefreshToken(authentication);
            }
            tokenDTO.setRefreshToken(refreshToken);
            return tokenDTO;
        }

        log.debug(MessageFormat.format("principal {0} has the following not of user type",
                ((User) authentication.getPrincipal()).getUsername()
        ));
        TokenDTO tokenDTO = new TokenDTO();
        tokenDTO.setUserId(user.getUserId().toString());
        tokenDTO.setAccessToken(createAccessToken(authentication));
        String refreshToken;
        if (authentication.getCredentials() instanceof Jwt jwt) {
            Instant expiresAt = jwt.getExpiresAt();
            Duration duration = Duration.between(Instant.now(), expiresAt);
            long daysUntilExpired = duration.toDays();
            if (daysUntilExpired < 2) {
                refreshToken = createRefreshToken(authentication);
            } else {
                refreshToken = jwt.getTokenValue();
            }
        } else {
            refreshToken = createRefreshToken(authentication);
        }
        tokenDTO.setRefreshToken(refreshToken);
        return tokenDTO;
    }
}
