package com.capetown.transit.repository;

import com.capetown.transit.entity.FareRule;
import com.capetown.transit.entity.FareRule.Mode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface FareRuleRepository extends JpaRepository<FareRule, UUID> {
    List<FareRule> findByModeAndActiveTrue(Mode mode);
}
