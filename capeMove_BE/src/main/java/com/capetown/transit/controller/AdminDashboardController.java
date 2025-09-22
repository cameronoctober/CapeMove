package com.capetown.transit.controller;

import com.capetown.transit.dto.IncidentReportDTO;
import com.capetown.transit.entity.Role;
import com.capetown.transit.entity.User;
import com.capetown.transit.service.AdminService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMIN','MODERATOR')")
public class AdminDashboardController {

    private final AdminService adminService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> listUsers() {
        return ResponseEntity.ok(adminService.listUsers());
    }

    @PutMapping("/users/{id}/roles")
    public ResponseEntity<User> updateUserRoles(@PathVariable UUID id, @RequestBody Set<Role> roles) {
        User updatedUser = adminService.updateUserRoles(id, roles);
        return ResponseEntity.ok(updatedUser);
    }

    @GetMapping("/reports/moderation")
    public ResponseEntity<Page<IncidentReportDTO>> getReportsForModeration(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<IncidentReportDTO> reports = adminService.getReportsForModeration(page, size);
        return ResponseEntity.ok(reports);
    }

    @PostMapping("/reports/{id}/validate")
    public ResponseEntity<IncidentReportDTO> validateReport(
            @PathVariable UUID id,
            @RequestParam @NotNull com.capetown.transit.entity.IncidentReport.Status status,
            Authentication authentication) {
        String moderatorUsername = authentication.getName();
        IncidentReportDTO updated = adminService.validateReport(id, status, moderatorUsername);
        return ResponseEntity.ok(updated);
    }
}
