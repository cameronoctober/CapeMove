package com.capetown.transit.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "journey_plans")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JourneyPlan {

    @Id
    @GeneratedValue
    @Column(columnDefinition = "uuid", updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String origin;

    @Column(nullable = false)
    private String destination;

    @ElementCollection
    @CollectionTable(name = "journey_modes", joinColumns = @JoinColumn(name = "journey_plan_id"))
    @Column(name = "mode", nullable = false)
    private List<String> modes;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private Instant plannedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
