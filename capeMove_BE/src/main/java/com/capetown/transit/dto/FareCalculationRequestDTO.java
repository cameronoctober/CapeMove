package com.capetown.transit.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FareCalculationRequestDTO {

    @NotEmpty
    private List<JourneySegment> segments;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class JourneySegment {
        @NotBlank
        private String mode;

        @DecimalMin("0.0")
        private BigDecimal distanceKm;

        private List<String> zones;
    }
}
