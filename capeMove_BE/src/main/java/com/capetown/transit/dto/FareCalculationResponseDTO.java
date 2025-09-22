package com.capetown.transit.dto;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FareCalculationResponseDTO {

    private BigDecimal totalFare;

    private List<ModeFare> breakdown;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ModeFare {
        private String mode;
        private BigDecimal fare;
        private List<String> appliedRules;
    }
}
