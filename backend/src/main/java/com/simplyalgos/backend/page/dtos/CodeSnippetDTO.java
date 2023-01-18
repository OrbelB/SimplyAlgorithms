package com.simplyalgos.backend.page.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class CodeSnippetDTO {
    String languageTitle;
    String codeText;
}
