package com.simplyalgos.backend.universalReport.controller;


import com.simplyalgos.backend.universalReport.dto.UniversalReportDTO;
import com.simplyalgos.backend.universalReport.service.UniversalReportService;
import com.simplyalgos.backend.user.security.perms.AdminPermission;
import com.simplyalgos.backend.utils.StringUtils;
import io.swagger.v3.core.util.Json;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RequiredArgsConstructor
@CrossOrigin(methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT,
        RequestMethod.DELETE, RequestMethod.OPTIONS, RequestMethod.HEAD,
        RequestMethod.PATCH, RequestMethod.TRACE}, origins = "*", allowedHeaders = "*", maxAge = 3600)
@RequestMapping("report")
@Slf4j
@RestController
public class UniversalReportController {
    private final UniversalReportService URS;

//    TESTED AND PASSED
    @PostMapping(path = "/createReport", consumes = "application/json" ,produces = "application/json")
    public ResponseEntity<?> createReport(@RequestBody UniversalReportDTO universalReportDTO){
        log.debug("Creating a new report \n" + Json.pretty(universalReportDTO));
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(URS.createReport(universalReportDTO));
    }

//    TESTED AND PASSED
    @AdminPermission
    @PutMapping(path = "/updateReport", consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> updateReport(@RequestBody UniversalReportDTO universalReportDTO){
        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(URS.updateReport(universalReportDTO));
    }

    @AdminPermission
    @DeleteMapping(path = "/deleteReport", produces = "application/json")
    public ResponseEntity<?> deleteReport(@RequestParam UUID reportId){
        return ResponseEntity.ok().body(URS.deleteReport(reportId));
    }

    @AdminPermission
    @GetMapping(path = "getReport", produces = "application/json")
    public ResponseEntity<?> getReport(@RequestParam UUID reportId){
        return ResponseEntity.ok(URS.getUniversalReport(reportId));
    }

//    TESTED AND PASSED
    @AdminPermission
    @GetMapping(path = "/listReports", produces = "application/json")
    public ResponseEntity<?> listReports(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                         @RequestParam(name = "size", defaultValue = "5") Integer size,
                                         @RequestParam(name = "sortBy", defaultValue = "reportDate") String sortBy){
        return ResponseEntity.ok(URS.listReport(PageRequest.of(page, size, Sort.by(sortBy).descending())));
    }


    @AdminPermission
    @GetMapping(path = "/listIndividualReports", produces = "application/json")
    public ResponseEntity<?> listReportByIndividual(@RequestParam(name = "page", defaultValue = "0") Integer page,
                                                    @RequestParam(name = "size", defaultValue = "5") Integer size,
                                                    @RequestParam(name = "sortBy", defaultValue = "publicNote") String sortBy,
                                                    @RequestParam(name = "userId") UUID userId,
                                                    @RequestParam(name = "individual") String individual){
        if (StringUtils.isNotNullAndEmptyOrBlank(individual)){
            if (individual.equals("victum")) {
                return ResponseEntity.ok(URS
                        .listByVictum(PageRequest.of(page, size, Sort.by(sortBy)), userId));
            }
            if (individual.equals("culprit")) {
                return ResponseEntity.ok(URS
                        .listByCulprit(PageRequest.of(page, size, Sort.by(sortBy)), userId));
            }
            if (individual.equals("resolver")) {
                return ResponseEntity.ok(URS
                        .listByVictum(PageRequest.of(page, size, Sort.by(sortBy)), userId));
            }

        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("individual type not found, " +
                "\n accepted types: victum, culprit, or resolver");
    }


}


