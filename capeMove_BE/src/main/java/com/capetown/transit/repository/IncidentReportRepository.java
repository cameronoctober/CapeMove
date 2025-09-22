package com.capetown.transit.repository;

import com.capetown.transit.entity.IncidentReport;
import com.capetown.transit.entity.IncidentReport.Status;
import com.capetown.transit.entity.IncidentReport.Type;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface IncidentReportRepository extends JpaRepository<IncidentReport, UUID> {
    Page<IncidentReport> findByStatus(Status status, Pageable pageable);

    Page<IncidentReport> findByType(Type type, Pageable pageable);

    Page<IncidentReport> findByStatusAndType(Status status, Type type, Pageable pageable);
}
