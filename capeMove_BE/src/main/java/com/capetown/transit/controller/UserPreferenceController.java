package com.capetown.transit.controller;

import com.capetown.transit.dto.UserPreferenceDTO;
import com.capetown.transit.service.UserPreferenceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users/preferences")
@RequiredArgsConstructor
public class UserPreferenceController {

    private final UserPreferenceService userPreferenceService;

    @GetMapping
    public ResponseEntity<UserPreferenceDTO> getUserPreferences(Authentication authentication) {
        String username = authentication.getName();
        UserPreferenceDTO preferences = userPreferenceService.getPreferences(username);
        return ResponseEntity.ok(preferences);
    }

    @PutMapping
    public ResponseEntity<UserPreferenceDTO> updateUserPreferences(@Valid @RequestBody UserPreferenceDTO dto, Authentication authentication) {
        String username = authentication.getName();
        UserPreferenceDTO updated = userPreferenceService.updatePreferences(username, dto);
        return ResponseEntity.ok(updated);
    }
}
