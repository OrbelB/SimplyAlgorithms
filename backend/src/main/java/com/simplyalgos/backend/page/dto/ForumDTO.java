package com.simplyalgos.backend.page.dto;

import com.simplyalgos.backend.user.dtos.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ForumDTO {
    UUID pageId;
    String descriptionText;
    String title;
    String createdDate;
    String photo;
    String video;
    int upVotes;
    int downVotes;
    UserDTO userDto;
}
