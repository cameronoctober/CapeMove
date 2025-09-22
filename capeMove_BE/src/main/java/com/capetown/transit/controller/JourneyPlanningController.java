package com.capetown.transit.controller;

import com.capetown.transit.dto.JourneyPlanDTO;
import com.capetown.transit.entity.Route;
import com.capetown.transit.service.JourneyPlanningService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
// import org.springdoc.core.annotations.ParameterObject; // Not used; removed to fix build
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/journeys")
@RequiredArgsConstructor
@Validated
public class JourneyPlanningController {

    private final JourneyPlanningService journeyPlanningService;

    @GetMapping("/plan")
    public ResponseEntity<List<JourneyPlanDTO>> planJourney(
            @RequestParam @NotBlank String origin,
            @RequestParam @NotBlank String destination,
            @RequestParam(required = false) List<String> modes) {
        List<JourneyPlanDTO> plans = journeyPlanningService.planJourney(origin, destination, modes);
        return ResponseEntity.ok(plans);
    }

    @GetMapping("/routes")
    public ResponseEntity<List<Route>> getRoutes(@RequestParam @NotBlank String mode) {
        List<Route> routes = journeyPlanningService.getRoutesByMode(mode);
        return ResponseEntity.ok(routes);
    }
}
