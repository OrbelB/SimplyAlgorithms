package com.simplyalgos.backend.user.repositories.projections;

import org.springframework.beans.factory.annotation.Value;

public interface UserInformationOnly {



    String getUsername();
    String getFirstName();
    String getLastName();
    String getProfilePicture();
    String getEmail();

    @Value("#{target.roles[0].roleName}")
    String getRole();
    boolean isAccountNonLocked();
}
