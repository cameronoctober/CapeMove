package com.capetown.transit.repository;

import com.capetown.transit.entity.Route;
import com.capetown.transit.entity.Route.Mode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RouteRepository extends JpaRepository<Route, UUID> {
    List<Route> findByModeAndActiveTrue(Mode mode);
}
