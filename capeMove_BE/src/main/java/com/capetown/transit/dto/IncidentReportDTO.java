package com.capetown.transit.dto;

import com.capetown.transit.entity.IncidentReport.Status;
import com.capetown.transit.entity.IncidentReport.Type;
import jakarta.validation.constraints.*;

import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IncidentReportDTO {

    private UUID id;

    @NotNull
    @DecimalMin(value = "-90.0")
    @DecimalMax(value = "90.0")
    private Double latitude;

    @NotNull
    @DecimalMin(value = "-180.0")
    @DecimalMax(value = "180.0")
    private Double longitude;

    @NotBlank
    @Size(max = 1000)
    private String description;

    @NotNull
    private Type type;

    private Status status;

    private Instant createdAt;

    private UUID moderatedBy;

    private Instant moderatedAt;
}
