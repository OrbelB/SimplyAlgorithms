package com.simplyalgos.backend.user.security;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.util.Set;
import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity(name = "authority")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "authorityId")
public class Authority {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false, name = "authority_id")
    private UUID authorityId;

    private String permission;

    //referencing the property authorities where we have declared the dependencies for joining tables
    @ManyToMany(mappedBy = "authorities")
    private Set<Role> roles;
}
