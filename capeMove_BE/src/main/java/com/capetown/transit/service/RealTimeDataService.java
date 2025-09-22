package com.capetown.transit.service;

import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class RealTimeDataService {

    private final RestTemplate restTemplate;

    private static final String OPEN_DATA_ARRIVALS_API = "https://api.capetown.gov.za/opendata/arrivals";
    private static final String OPEN_DATA_VEHICLE_TRACKING_API = "https://api.capetown.gov.za/opendata/vehicle-tracking";
    private static final String OPEN_DATA_DISRUPTIONS_API = "https://api.capetown.gov.za/opendata/disruptions";

    @Cacheable(value = "arrivalsCache", key = "#stopId", unless = "#result == null")
    public Map<String, Object> getArrivals(String stopId) {
        if (stopId == null || stopId.isBlank()) {
            throw new IllegalArgumentException("stopId is required");
        }
        String url = OPEN_DATA_ARRIVALS_API + "?stopId=" + stopId;
        return restTemplate.getForObject(url, Map.class);
    }

    @Cacheable(value = "vehicleTrackingCache", key = "#vehicleId", unless = "#result == null")
    public Map<String, Object> getVehicleTracking(String vehicleId) {
        if (vehicleId == null || vehicleId.isBlank()) {
            throw new IllegalArgumentException("vehicleId is required");
        }
        String url = OPEN_DATA_VEHICLE_TRACKING_API + "?vehicleId=" + vehicleId;
        return restTemplate.getForObject(url, Map.class);
    }

    @Cacheable(value = "disruptionsCache", unless = "#result == null")
    public Map<String, Object> getDisruptions() {
        return restTemplate.getForObject(OPEN_DATA_DISRUPTIONS_API, Map.class);
    }
}
