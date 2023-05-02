package com.simplyalgos.backend.universalReport.dto;


import com.simplyalgos.backend.user.dtos.UserIdAndUsername;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class UniversalReportDTO {

    UUID reportId;  // SET IN BACKEND
    UUID foreignId; //NOT NULL
    UserIdAndUsername culpritUser;
    UserIdAndUsername  victimUser; //NOT NULL
    UserIdAndUsername  resolvedBy;
    String typeOfForeignId; //NOT NULL
    String catagory;        //NOT NULL -> profanity, incorrectInfo, error, other
    String report;          //NOT NULL
    String resolveNote;
    Timestamp reportDate;
    Timestamp resolveDate;  // SET IN BACKEND
    String isResolved = "No"; // SET IN BACKEND
//    isResolved = no, resolved, progress
}
