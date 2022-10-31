package com.simplyalgos.backend.page;


import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;


@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class ParentChildPagesId implements Serializable {

    @Column(name = "parent_page_id")
    private UUID parentPageId;

    @Column(name = "child_page_id")
    private UUID childPageId;


    @Builder
    public ParentChildPagesId(UUID parentPageId, UUID childPageId) {
        this.parentPageId = parentPageId;
        this.childPageId = childPageId;
    }
}
