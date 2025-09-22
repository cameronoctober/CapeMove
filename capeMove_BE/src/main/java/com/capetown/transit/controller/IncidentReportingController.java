package com.capetown.transit.controller;

import com.capetown.transit.dto.IncidentReportDTO;
import com.capetown.transit.entity.IncidentReport.Status;
import com.capetown.transit.service.IncidentReportingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
@Validated
public class IncidentReportingController {

    private final IncidentReportingService incidentReportingService;

    @PostMapping("/report")
    public ResponseEntity<IncidentReportDTO> reportIncident(@Valid @RequestBody IncidentReportDTO dto, Authentication authentication) {
        String username = authentication.getName();
        IncidentReportDTO created = incidentReportingService.createReport(dto, username);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/reports")
    public ResponseEntity<Page<IncidentReportDTO>> getReports(
            @RequestParam(required = false) Status status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<IncidentReportDTO> reports = incidentReportingService.getReports(status, page, size);
        return ResponseEntity.ok(reports);
    }
}
