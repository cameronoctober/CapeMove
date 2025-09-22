package com.capetown.transit.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "fare_rules")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FareRule {

    public enum Mode {
        BUS,
        TRAIN,
        MINIBUS_TAXI
    }

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Mode mode;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal baseFare;

    @Column(nullable = false, precision = 10, scale = 4)
    private BigDecimal perKmRate;

    @Column(nullable = false)
    private boolean zoneBased;

    @ElementCollection
    @CollectionTable(name = "fare_rule_zones", joinColumns = @JoinColumn(name = "fare_rule_id"))
    @Column(name = "zone")
    private List<String> zonesCovered;

    @Column(nullable = false)
    private boolean active;
}
