package com.simplyalgos.backend.page.domains;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.io.Serializable;
import java.util.UUID;


@Setter
@Getter
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class CodeSnippetId implements Serializable {


    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
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
