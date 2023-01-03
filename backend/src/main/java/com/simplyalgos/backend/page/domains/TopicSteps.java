package com.simplyalgos.backend.page.domains;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.simplyalgos.backend.page.domains.Topic;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;
import org.hibernate.annotations.Type;
import org.hibernate.usertype.UserTypeLegacyBridge;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.UUID;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity(name = "topic_page_steps")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "stepId")
public class TopicSteps {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(value = UserTypeLegacyBridge.class,
            parameters = @Parameter(name = UserTypeLegacyBridge.TYPE_NAME_PARAM_KEY,
                    value = "org.hibernate.type.UUIDCharType"))
    @Column(length = 36, name = "step_id", nullable = false, insertable = false)
    private UUID stepId;

    @ManyToOne
    @JoinColumn(name = "page_id", referencedColumnName = "page_id")
    private Topic topicPage;

    @Column(name = "step_number")
    private short stepNumber;

    private String step;

    @Column(name = "created_date")
    private Timestamp createdDate;

}
