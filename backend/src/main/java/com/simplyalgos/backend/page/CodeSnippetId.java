package com.simplyalgos.backend.page;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class CodeSnippetId implements Serializable {

    @Column(name = "page_id")
    private UUID pageId;

    @Column(name = "language_title")
    private String languageTitle;

    @Builder
    public CodeSnippetId(UUID pageId, String languageTitle) {
        this.pageId = pageId;
        this.languageTitle = languageTitle;
    }
}
