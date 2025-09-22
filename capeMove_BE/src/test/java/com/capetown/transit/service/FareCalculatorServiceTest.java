package com.capetown.transit.service;

import com.capetown.transit.dto.FareCalculationRequestDTO;
import com.capetown.transit.dto.FareCalculationResponseDTO;
import com.capetown.transit.entity.FareRule;
import com.capetown.transit.entity.FareRule.Mode;
import com.capetown.transit.repository.FareRuleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class FareCalculatorServiceTest {

    @Mock
    private FareRuleRepository fareRuleRepository;

    @InjectMocks
    private FareCalculatorService fareCalculatorService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void calculateFare_distanceBasedFare_calculatesCorrectly() {
        FareRule busRule = FareRule.builder()
                .mode(Mode.BUS)
                .baseFare(BigDecimal.valueOf(5.00))
                .perKmRate(BigDecimal.valueOf(1.00))
                .zoneBased(false)
                .active(true)
                .build();

        when(fareRuleRepository.findByModeAndActiveTrue(Mode.BUS)).thenReturn(List.of(busRule));

        FareCalculationRequestDTO request = FareCalculationRequestDTO.builder()
                .segments(List.of(
                        FareCalculationRequestDTO.JourneySegment.builder()
                                .mode("BUS")
                                .distanceKm(BigDecimal.valueOf(10))
                                .build()
                ))
                .build();

        FareCalculationResponseDTO response = fareCalculatorService.calculateFare(request);

        assertNotNull(response);
        assertEquals(BigDecimal.valueOf(15.00).setScale(2), response.getTotalFare());
        assertEquals(1, response.getBreakdown().size());
        assertEquals("BUS", response.getBreakdown().get(0).getMode());
    }

    @Test
    void calculateFare_zoneBasedFare_appliesCorrectRule() {
        FareRule zoneRule1 = FareRule.builder()
                .mode(Mode.TRAIN)
                .baseFare(BigDecimal.valueOf(3.00))
                .perKmRate(BigDecimal.valueOf(0.50))
                .zoneBased(true)
                .zonesCovered(List.of("Zone1"))
                .active(true)
                .build();

        FareRule zoneRule2 = FareRule.builder()
                .mode(Mode.TRAIN)
                .baseFare(BigDecimal.valueOf(4.00))
                .perKmRate(BigDecimal.valueOf(0.40))
                .zoneBased(true)
                .zonesCovered(List.of("Zone2"))
                .active(true)
                .build();

        when(fareRuleRepository.findByModeAndActiveTrue(Mode.TRAIN)).thenReturn(List.of(zoneRule1, zoneRule2));

        FareCalculationRequestDTO request = FareCalculationRequestDTO.builder()
                .segments(List.of(
                        FareCalculationRequestDTO.JourneySegment.builder()
                                .mode("TRAIN")
                                .distanceKm(BigDecimal.valueOf(5))
                                .zones(List.of("Zone1"))
                                .build()
                ))
                .build();

        FareCalculationResponseDTO response = fareCalculatorService.calculateFare(request);

        assertNotNull(response);
        assertEquals(BigDecimal.valueOf(3.00).setScale(2), response.getTotalFare());
        assertEquals(1, response.getBreakdown().size());
        assertEquals("TRAIN", response.getBreakdown().get(0).getMode());
    }
}
