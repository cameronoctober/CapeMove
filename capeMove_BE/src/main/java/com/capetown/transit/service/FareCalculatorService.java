package com.capetown.transit.service;

import com.capetown.transit.dto.FareCalculationRequestDTO;
import com.capetown.transit.dto.FareCalculationResponseDTO;
import com.capetown.transit.entity.FareRule;
import com.capetown.transit.entity.FareRule.Mode;
import com.capetown.transit.repository.FareRuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.*;

@Service
@RequiredArgsConstructor
public class FareCalculatorService {

    private final FareRuleRepository fareRuleRepository;

    public FareCalculationResponseDTO calculateFare(FareCalculationRequestDTO request) {
        BigDecimal totalFare = BigDecimal.ZERO;
        List<FareCalculationResponseDTO.ModeFare> breakdown = new ArrayList<>();

        for (FareCalculationRequestDTO.JourneySegment segment : request.getSegments()) {
            Mode mode;
            try {
                mode = Mode.valueOf(segment.getMode().toUpperCase());
            } catch (IllegalArgumentException e) {
                continue; // skip invalid mode
            }

            List<FareRule> rules = fareRuleRepository.findByModeAndActiveTrue(mode);
            if (rules.isEmpty()) {
                continue;
            }

            FareRule applicableRule = findApplicableRule(rules, segment.getZones());

            BigDecimal fare = applicableRule.getBaseFare();
            if (!applicableRule.isZoneBased()) {
                fare = fare.add(applicableRule.getPerKmRate().multiply(segment.getDistanceKm()));
            }

            totalFare = totalFare.add(fare);

            breakdown.add(FareCalculationResponseDTO.ModeFare.builder()
                    .mode(mode.name())
                    .fare(fare.setScale(2, BigDecimal.ROUND_HALF_UP))
                    .appliedRules(List.of(
                            "Base Fare: " + applicableRule.getBaseFare(),
                            "Per Km Rate: " + applicableRule.getPerKmRate(),
                            "Zone Based: " + applicableRule.isZoneBased()))
                    .build());
        }

        return FareCalculationResponseDTO.builder()
                .totalFare(totalFare.setScale(2, BigDecimal.ROUND_HALF_UP))
                .breakdown(breakdown)
                .build();
    }

    private FareRule findApplicableRule(List<FareRule> rules, List<String> zones) {
        if (zones == null || zones.isEmpty()) {
            return rules.get(0);
        }
        for (FareRule rule : rules) {
            if (rule.isZoneBased() && rule.getZonesCovered().containsAll(zones)) {
                return rule;
            }
        }
        return rules.get(0);
    }
}
