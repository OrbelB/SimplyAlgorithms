package com.simplyalgos.backend.universalReport.repository;

import com.simplyalgos.backend.universalReport.domain.UniversalReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UniversalReportRepository extends JpaRepository<UniversalReport, UUID> {

    Page<UniversalReport> findAllByVictimUser_UserId(UUID userId ,Pageable pageable);
    Page<UniversalReport> findAllByVictimUser_Username(String username, Pageable pageable);

    Page<UniversalReport> findAllByCulpritUser_UserId(UUID userId, Pageable pageable);
    Page<UniversalReport> findAllByCulpritUser_Username(String username, Pageable pageable);

    Page<UniversalReport> findAllByResolvedBy_UserId(UUID userId, Pageable pageable);

    Page<UniversalReport> findAllByResolvedBy_Username(String username, Pageable pageable);


}
