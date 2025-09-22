package com.capetown.transit.service;

import com.capetown.transit.dto.JourneyPlanDTO;
import com.capetown.transit.entity.Route;
import com.capetown.transit.entity.Route.Mode;
import com.capetown.transit.exception.ResourceNotFoundException;
import com.capetown.transit.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class JourneyPlanningService {

    private final RouteRepository routeRepository;
    private final RestTemplate restTemplate;

    private static final String OPEN_DATA_SCHEDULES_API = "https://api.capetown.gov.za/opendata/schedules";

    public List<JourneyPlanDTO> planJourney(String origin, String destination, List<String> modes) {
        // Validate modes
        if (modes == null || modes.isEmpty()) {
            modes = List.of("BUS", "TRAIN", "MINIBUS_TAXI");
        }

        List<JourneyPlanDTO> plans = new ArrayList<>();

        // For simplicity, simulate multimodal journey plans combining the requested modes.
        // In real implementation, this would call external APIs and complex logic.

        for (String modeStr : modes) {
            Mode mode;
            try {
                mode = Mode.valueOf(modeStr.toUpperCase());
            } catch (IllegalArgumentException e) {
                continue; // skip invalid mode
            }

            List<Route> activeRoutes = routeRepository.findByModeAndActiveTrue(mode);
            if (activeRoutes.isEmpty()) continue;

            // Simulate journey plan with a single segment per mode
            var segment = JourneyPlanDTO.JourneySegment.builder()
                    .mode(mode.name())
                    .routeNumber(activeRoutes.get(0).getRouteNumber())
                    .durationMinutes(30)
                    .transfers(0)
                    .build();

            JourneyPlanDTO plan = JourneyPlanDTO.builder()
                    .origin(origin)
                    .destination(destination)
                    .segments(List.of(segment))
                    .plannedAt(new Date().toInstant())
                    .build();

            plans.add(plan);
        }

        if (plans.isEmpty()) {
            throw new ResourceNotFoundException("No journey plans found for given modes");
        }

        return plans;
    }

    public List<Route> getRoutesByMode(String mode) {
        if (mode == null || mode.isBlank()) {
            throw new IllegalArgumentException("Mode parameter is required.");
        }
        Route.Mode routeMode;
        try {
            routeMode = Route.Mode.valueOf(mode.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid mode: " + mode);
        }
        return routeRepository.findByModeAndActiveTrue(routeMode);
    }
}
