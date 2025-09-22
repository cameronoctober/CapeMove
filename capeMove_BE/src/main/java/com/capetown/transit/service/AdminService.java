package com.capetown.transit.service;

import com.capetown.transit.dto.IncidentReportDTO;
import com.capetown.transit.entity.IncidentReport;
import com.capetown.transit.entity.IncidentReport.Status;
import com.capetown.transit.entity.User;
import com.capetown.transit.entity.Role;
import com.capetown.transit.exception.ResourceNotFoundException;
import com.capetown.transit.repository.IncidentReportRepository;
import com.capetown.transit.repository.UserRepository;
import com.capetown.transit.util.MappingConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final IncidentReportRepository incidentReportRepository;
    private final MappingConfig mappingConfig;

    public List<User> listUsers() {
        return userRepository.findAll();
    }

    public User updateUserRoles(UUID userId, Set<Role> roles) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setRoles(roles);
        return userRepository.save(user);
    }

    public Page<IncidentReportDTO> getReportsForModeration(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.ASC, "createdAt"));
        Page<IncidentReport> pendingReports = incidentReportRepository.findByStatus(Status.PENDING, pageable);
        return pendingReports.map(mappingConfig::incidentReportToDto);
    }

    public IncidentReportDTO validateReport(UUID reportId, Status newStatus, String moderatorUsername) {
        if (newStatus != Status.APPROVED && newStatus != Status.REJECTED) {
            throw new IllegalArgumentException("Invalid status for moderation");
        }

        IncidentReport report = incidentReportRepository.findById(reportId)
                .orElseThrow(() -> new ResourceNotFoundException("Incident report not found"));

        if (report.getStatus() != Status.PENDING) {
            throw new IllegalStateException("Report already moderated");
        }

        User moderator = userRepository.findByUsername(moderatorUsername)
                .orElseThrow(() -> new ResourceNotFoundException("Moderator user not found"));

        report.setStatus(newStatus);
        report.setModeratedBy(moderator);
        report.setModeratedAt(java.time.Instant.now());

        IncidentReport updated = incidentReportRepository.save(report);
        return mappingConfig.incidentReportToDto(updated);
    }
}
