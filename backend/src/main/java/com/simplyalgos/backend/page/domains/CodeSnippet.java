package com.simplyalgos.backend.page.domains;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.domains.ids.CodeSnippetId;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;

import static org.hibernate.annotations.OnDeleteAction.CASCADE;

@Setter
@Getter
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "codeSnippetId")
@Entity(name = "code_snippet")
public class CodeSnippet {

    @EmbeddedId
    private CodeSnippetId codeSnippetId;

    @Builder
    public CodeSnippet(CodeSnippetId codeSnippetId, Topic topicPage, String codeText) {
        this.codeSnippetId = codeSnippetId;
        this.topicPage = topicPage;
        this.codeText = codeText;
    }

    @ManyToOne
    @JoinColumn(name = "page_id", referencedColumnName = "page_id")
    @OnDelete(action = CASCADE)
    @MapsId("pageId")
    private Topic topicPage;

    @Column(name = "code_text")
    private String codeText;


}
