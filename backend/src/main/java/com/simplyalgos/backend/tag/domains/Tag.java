package com.simplyalgos.backend.tag.domains;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.domains.PageEntity;
import lombok.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "tag")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "tagId")
public class Tag {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @org.hibernate.annotations.Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(name = "tag_id", length = 36, updatable = false, nullable = false, columnDefinition = "varchar")
    private UUID tagId;

    private String tag;

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    @JoinTable(name = "page_tag",
            joinColumns = {@JoinColumn(name = "tag_id", referencedColumnName = "tag_id", foreignKey = @ForeignKey(name = "tag_id"))},
            inverseJoinColumns = {@JoinColumn(name = "page_id", referencedColumnName = "page_id", foreignKey = @ForeignKey(name = "page_id"))})
    private Set<PageEntity> pageEntities = new HashSet<>();


}
