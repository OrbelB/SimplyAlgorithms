package com.simplyalgos.backend.universalReport.repository;

import com.simplyalgos.backend.universalReport.domain.UniversalReport;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UniversalReportRepository extends JpaRepository<UniversalReport, UUID> {

    <T> Page<T> findAllByVictimUser_UserId(UUID userId ,Pageable pageable, Class<T> Type);
    <T> Page<T> findAllByVictimUser_Username(String username, Pageable pageable, Class<T> Type);

    <T> Page<T>  findAllByCulpritUser_UserId(UUID userId, Pageable pageable, Class<T> type);
    <T> Page<T> findAllByCulpritUser_Username(String username, Pageable pageable, Class<T> type);

    <T> Page<T>  findAllByResolvedBy_UserId(UUID userId, Pageable pageable, Class<T> type);

    <T> Page<T>  findAllByResolvedBy_Username(String username, Pageable pageable, Class<T> Type);


}
