package com.simplyalgos.backend.page.domains;


import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.domains.ids.CodeSnippetId;
import lombok.*;

import jakarta.persistence.*;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "codeSnippetId")
@Entity(name = "code_snippet")
@Table(
        uniqueConstraints =
        @UniqueConstraint(columnNames = {"language_title", "page_id"})
)
public class CodeSnippet {

    @EmbeddedId
    private CodeSnippetId codeSnippetId;

    @Builder
    public CodeSnippet(CodeSnippetId codeSnippetId, Topic topicPage, String codeText, String languageTitle, UUID pageId) {
        this.codeSnippetId = codeSnippetId;
        this.topicPage = topicPage;
        this.codeText = codeText;
    }

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id", referencedColumnName = "page_id", insertable = false, updatable = false, foreignKey = @ForeignKey(name = "page_id"))
    private Topic topicPage;

    @Column(name = "code_text")
    private String codeText;


}
