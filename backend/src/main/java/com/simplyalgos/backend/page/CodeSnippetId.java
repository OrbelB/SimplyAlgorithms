package com.simplyalgos.backend.page;

import lombok.*;
import org.hibernate.annotations.Type;

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

    @Type(type = "org.hibernate.type.UUIDCharType")
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
