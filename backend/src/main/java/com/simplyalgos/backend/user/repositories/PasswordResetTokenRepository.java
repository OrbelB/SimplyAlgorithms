package com.simplyalgos.backend.user.repositories;

import com.simplyalgos.backend.user.domains.PasswordResetToken;
import com.simplyalgos.backend.user.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.Optional;

@EnableScheduling
public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {


    boolean existsByUserId(User userid);

    boolean deleteByUserId(User userid);

    PasswordResetToken getPasswordResetTokenByUserId(User userid);

    @Modifying
    @Query(nativeQuery = true, value = "DELETE FROM password_reset_token WHERE expire_date < :expire_date")
    void deleteAllExpiredTokens(@Param("expire_date") String expireDate);
}
