package com.simplyalgos.backend.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
@NoArgsConstructor
@Data
@AllArgsConstructor
@Builder
public class ChildrenCommentRetrieval{
        List<CommentBasicDTO> childrenComments = new ArrayList<>();
}
