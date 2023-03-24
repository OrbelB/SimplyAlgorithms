package com.simplyalgos.backend.page.repositories.projection;

import org.springframework.beans.factory.annotation.Value;

public interface CodeSnippetInfo {


    @Value("#{target.codeText}")
    String getCodeText();

    @Value("#{target.codeSnippetId.languageTitle}")
    String getLanguageTitle();
}
