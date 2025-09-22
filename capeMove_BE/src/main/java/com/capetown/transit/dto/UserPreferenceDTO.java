package com.capetown.transit.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPreferenceDTO {

    @Size(max = 5)
    private List<String> preferredModes;

    @NotNull
    private Boolean notifyOnIncidents;

    @NotNull
    private Boolean notifyOnDisruptions;
}
