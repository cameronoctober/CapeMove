package com.capetown.transit.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "routes")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Route {

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

    @Column(nullable = false, length = 20)
    private String routeNumber;

    @ElementCollection
    @CollectionTable(name = "route_stops", joinColumns = @JoinColumn(name = "route_id"))
    @Column(name = "stop", nullable = false)
    private List<String> stops;

    @Column(nullable = false)
    private boolean active;
}
