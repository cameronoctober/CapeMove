package com.capetown.transit.repository;

import com.capetown.transit.entity.JourneyPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface JourneyPlanRepository extends JpaRepository<JourneyPlan, UUID> {
    List<JourneyPlan> findByUserId(UUID userId);

    void deleteByUserId(UUID userId);
}
