package com.simplyalgos.backend.page;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
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
    @Type(type = "org.hibernate.type.UUIDCharType")
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
