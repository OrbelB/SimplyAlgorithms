package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.CodeSnippet;
import com.simplyalgos.backend.page.domains.CodeSnippetId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, CodeSnippetId> {

}
