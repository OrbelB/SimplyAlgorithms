package com.simplyalgos.backend.page.repositories;

import com.simplyalgos.backend.page.domains.CodeSnippet;
import com.simplyalgos.backend.page.domains.Topic;
import com.simplyalgos.backend.page.domains.ids.CodeSnippetId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Set;

public interface CodeSnippetRepository extends JpaRepository<CodeSnippet, CodeSnippetId> {

    void removeByCodeSnippetIdNotInAndTopicPage(Set<CodeSnippetId> codeSnippetId, Topic topicPage);

}
