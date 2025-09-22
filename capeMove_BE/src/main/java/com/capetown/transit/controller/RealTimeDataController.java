package com.capetown.transit.controller;

import com.capetown.transit.service.RealTimeDataService;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/realtime")
@RequiredArgsConstructor
@Validated
public class RealTimeDataController {

    private final RealTimeDataService realTimeDataService;

    @GetMapping("/arrivals")
    public ResponseEntity<Map<String, Object>> getArrivals(@RequestParam @NotBlank String stopId) {
        Map<String, Object> arrivals = realTimeDataService.getArrivals(stopId);
        return ResponseEntity.ok(arrivals);
    }

    @GetMapping("/vehicle-tracking")
    public ResponseEntity<Map<String, Object>> getVehicleTracking(@RequestParam @NotBlank String vehicleId) {
        Map<String, Object> tracking = realTimeDataService.getVehicleTracking(vehicleId);
        return ResponseEntity.ok(tracking);
    }

    @GetMapping("/disruptions")
    public ResponseEntity<Map<String, Object>> getDisruptions() {
        Map<String, Object> disruptions = realTimeDataService.getDisruptions();
        return ResponseEntity.ok(disruptions);
    }
}
