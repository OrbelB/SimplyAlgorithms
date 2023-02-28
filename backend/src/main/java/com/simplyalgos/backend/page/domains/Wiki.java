package com.simplyalgos.backend.page.domains;



import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "wikiId")
@Entity(name = "wiki")
public class Wiki {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false, name = "wiki_id")
    private UUID wikiId;

    @Column(name = "wiki_name")
    private String wikiName;

    @Column(columnDefinition = "json", name = "description")
    private String description;

    @Column(name = "is_parent_child",columnDefinition = "varchar", length = 10)
    private String isParentChild;

    @OneToMany(mappedBy = "wikiParent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WikiParentChild> wikiParents;

    @OneToMany(mappedBy = "wikiChild", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WikiParentChild> wikiChildren;

    @OneToMany(mappedBy = "wikiCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WikiTopicPage> wikiTopicPages;





}
