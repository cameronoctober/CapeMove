package com.capetown.transit.controller;

import com.capetown.transit.dto.FareCalculationRequestDTO;
import com.capetown.transit.dto.FareCalculationResponseDTO;
import com.capetown.transit.service.FareCalculatorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/fares")
@RequiredArgsConstructor
public class FareCalculatorController {

    private final FareCalculatorService fareCalculatorService;

    @PostMapping("/calculate")
    public ResponseEntity<FareCalculationResponseDTO> calculateFare(@Valid @RequestBody FareCalculationRequestDTO request) {
        FareCalculationResponseDTO response = fareCalculatorService.calculateFare(request);
        return ResponseEntity.ok(response);
    }
}
