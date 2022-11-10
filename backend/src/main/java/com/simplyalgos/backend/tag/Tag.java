package com.simplyalgos.backend.tag;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.PageEntity;
import lombok.*;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
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
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(name = "tag_id")
    private UUID tagId;

    private String tag;

    @JsonIgnore
    @ManyToMany(cascade = {CascadeType.ALL}, fetch = FetchType.EAGER)
    @JoinTable(name = "page_tag",
            joinColumns = {@JoinColumn(name = "tag_id", referencedColumnName = "tag_id", foreignKey =@ForeignKey(name ="tag_id"))},
            inverseJoinColumns = {@JoinColumn(name = "page_id", referencedColumnName = "page_id" , foreignKey =@ForeignKey(name ="page_id") )})
    private Set<PageEntity> pageEntities = new HashSet<>();


}
