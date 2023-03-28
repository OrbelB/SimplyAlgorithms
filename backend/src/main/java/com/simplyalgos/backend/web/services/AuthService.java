package com.simplyalgos.backend.web.services;

import com.simplyalgos.backend.user.dtos.ChangePasswordDTO;
import com.simplyalgos.backend.user.dtos.GetUsernameDTO;
import com.simplyalgos.backend.user.dtos.PasswordResetRequestDTO;
import com.simplyalgos.backend.web.dtos.LoginDTO;
import com.simplyalgos.backend.web.dtos.SignupDTO;
import com.simplyalgos.backend.web.dtos.TokenDTO;

public interface AuthService {

    TokenDTO register(SignupDTO signupDTO) throws Exception;

    TokenDTO login(LoginDTO loginDTO);

    TokenDTO refreshToken(TokenDTO tokenDTO);

    void resetPassword(PasswordResetRequestDTO passwordResetRequestDTO);

    void changePassword(ChangePasswordDTO changePasswordDTO);

    <T> T getUsername(GetUsernameDTO getUsernameDTO, Class<T> tClass);
}
