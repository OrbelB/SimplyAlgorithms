package com.simplyalgos.backend.page;


import lombok.*;

import javax.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "code_snippet")
public class CodeSnippet {

    @EmbeddedId
    private CodeSnippetId codeSnippetId;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "page_id", referencedColumnName = "page_id")
    @MapsId("pageId")
    private Topic topicPage;

    @Column(name = "code_text")
    private String codeText;


}
