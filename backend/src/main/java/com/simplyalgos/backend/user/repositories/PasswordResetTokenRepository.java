package com.simplyalgos.backend.user.repositories;

import com.simplyalgos.backend.user.domains.PasswordResetToken;
import com.simplyalgos.backend.user.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;
import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, UUID> {

    boolean findByPasswordResetTokenID(UUID tokenID);



    boolean existsByUserId(User userid);

    boolean deleteByUserId(User userid);

    PasswordResetToken getPasswordResetTokenByUserId(User userid);
}
