package com.capetown.transit.service;

import com.capetown.transit.dto.IncidentReportDTO;
import com.capetown.transit.entity.IncidentReport;
import com.capetown.transit.entity.IncidentReport.Status;
import com.capetown.transit.entity.User;
import com.capetown.transit.exception.ResourceNotFoundException;
import com.capetown.transit.repository.IncidentReportRepository;
import com.capetown.transit.repository.UserRepository;
import com.capetown.transit.util.MappingConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IncidentReportingService {

    private final IncidentReportRepository incidentReportRepository;
    private final UserRepository userRepository;
    private final MappingConfig mappingConfig;

    public IncidentReportDTO createReport(IncidentReportDTO dto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        IncidentReport incident = mappingConfig.dtoToIncidentReport(dto);
        incident.setUser(user);
        incident.setStatus(Status.PENDING);
        incident.setCreatedAt(Instant.now());

        IncidentReport saved = incidentReportRepository.save(incident);
        return mappingConfig.incidentReportToDto(saved);
    }

    public Page<IncidentReportDTO> getReports(Status status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<IncidentReport> reports;
        if (status != null) {
            reports = incidentReportRepository.findByStatus(status, pageable);
        } else {
            reports = incidentReportRepository.findAll(pageable);
        }
        return reports.map(mappingConfig::incidentReportToDto);
    }

    public IncidentReportDTO moderateReport(UUID reportId, Status newStatus, String moderatorUsername) {
        IncidentReport report = incidentReportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Incident report not found"));

        if (report.getStatus() != Status.PENDING) {
            throw new IllegalStateException("Report already moderated");
        }

        User moderator = userRepository.findByUsername(moderatorUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Moderator not found"));

        report.setStatus(newStatus);
        report.setModeratedBy(moderator);
        report.setModeratedAt(Instant.now());

        IncidentReport updated = incidentReportRepository.save(report);
        return mappingConfig.incidentReportToDto(updated);
    }
}
