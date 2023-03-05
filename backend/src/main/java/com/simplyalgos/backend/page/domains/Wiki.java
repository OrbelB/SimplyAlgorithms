package com.simplyalgos.backend.page.domains;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.simplyalgos.backend.utils.JsonToStringConverter;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @Convert(converter = JsonToStringConverter.class)
    @Column(columnDefinition = "json", name = "description")
    private Map<String, Object> description;

    @Column(name = "is_parent_child",columnDefinition = "varchar", length = 10)
    private String isParentChild;

    @JsonIgnore
    @OneToMany(mappedBy = "wikiChild", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WikiParentChild> wikiParents = new HashSet<>();

    @JsonIncludeProperties({"wikiChild"})
    @OneToMany(mappedBy = "wikiParent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WikiParentChild> wikiChildren = new HashSet<>();


    @JsonIncludeProperties({"topicPage"})
    @OneToMany(mappedBy = "wikiCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<WikiTopicPage> wikiTopicPages =  new HashSet<>();


    public void addWikiTopicPage(WikiTopicPage wikiTopicPage) {
        wikiTopicPages.add(wikiTopicPage);
        wikiTopicPage.setWikiCategory(this);
    }

    public void removeWikiTopicPage(WikiTopicPage wikiTopicPage) {
        wikiTopicPages.remove(wikiTopicPage);
        wikiTopicPage.setWikiCategory(null);
    }

    public void addWikiChild(WikiParentChild wikiParentChild) {
        wikiChildren.add(wikiParentChild);
        wikiParentChild.setWikiParent(this);
    }

    public void removeWikiChild(WikiParentChild wikiParentChild) {
        wikiChildren.remove(wikiParentChild);
        wikiParentChild.setWikiParent(null);
    }





}
