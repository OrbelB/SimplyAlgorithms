package com.simplyalgos.backend.page;

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
public class TopicSteps {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Type(type = "org.hibernate.type.UUIDCharType")
    @Column(length = 16, name = "step_id")
    private UUID stepID;


    @ManyToOne
    @JoinColumn(name = "page_id")
    private Topic topic;

    @Column(name = "step_number")
    private short stepNumber;

    private String step;

    @Column(name = "created_date")
    private Timestamp createdDate;

}
