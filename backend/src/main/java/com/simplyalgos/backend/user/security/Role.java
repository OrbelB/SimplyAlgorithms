package com.simplyalgos.backend.user.security;

import com.simplyalgos.backend.user.User;
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
@Entity(name = "role")
public class Role {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 36, columnDefinition = "varchar", updatable = false, nullable = false, name = "role_id")
    private UUID roleId;

    @Column(name = "role_name")
    private String roleName;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;


    //hibernate creates just a single sql statement rather than a separate statement for each entity
    @Singular
    @ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.EAGER)
    @JoinTable(name = "role_authority",
            joinColumns = {@JoinColumn(name = "role_id", referencedColumnName = "role_id")},
            inverseJoinColumns = {@JoinColumn(name = "authority_id", referencedColumnName = "authority_id")})
    private Set<Authority> authorities;

}
