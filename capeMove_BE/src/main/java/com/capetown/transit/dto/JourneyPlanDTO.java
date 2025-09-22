package com.capetown.transit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.time.Instant;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JourneyPlanDTO {

    @NotBlank
    private String origin;

    @NotBlank
    private String destination;

    @NotEmpty
    private List<JourneySegment> segments;

    private Instant plannedAt;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class JourneySegment {
        @NotBlank
        private String mode;

        @NotBlank
        private String routeNumber;

        private int durationMinutes;

        private int transfers;
    }
}
