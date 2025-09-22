package com.capetown.transit.controller;

import com.capetown.transit.dto.JourneyPlanDTO;
import com.capetown.transit.entity.Route;
import com.capetown.transit.entity.Route.Mode;
import com.capetown.transit.service.JourneyPlanningService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@WebMvcTest(JourneyPlanningController.class)
class JourneyPlanningControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JourneyPlanningService journeyPlanningService;

    private JourneyPlanDTO samplePlan;

    @BeforeEach
    void setUp() {
        JourneyPlanDTO.JourneySegment segment = JourneyPlanDTO.JourneySegment.builder()
                .mode("BUS")
                .routeNumber("M1")
                .durationMinutes(30)
                .transfers(0)
                .build();

        samplePlan = JourneyPlanDTO.builder()
                .origin("Central Station")
                .destination("Airport")
                .segments(List.of(segment))
                .build();
    }

    @Test
    void planJourney_validInput_returnsPlans() throws Exception {
        when(journeyPlanningService.planJourney(anyString(), anyString(), ArgumentMatchers.anyList()))
                .thenReturn(List.of(samplePlan));

        mockMvc.perform(get("/api/journeys/plan")
                        .param("origin", "Central Station")
                        .param("destination", "Airport")
                        .param("modes", "BUS"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].origin", is("Central Station")))
                .andExpect(jsonPath("$[0].destination", is("Airport")))
                .andExpect(jsonPath("$[0].segments[0].mode", is("BUS")));
    }

    @Test
    void planJourney_missingOrigin_returnsBadRequest() throws Exception {
        mockMvc.perform(get("/api/journeys/plan")
                        .param("destination", "Airport"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void getRoutes_validMode_returnsRoutes() throws Exception {
        Route route = Route.builder()
                .id(null)
                .mode(Mode.BUS)
                .routeNumber("M1")
                .active(true)
                .build();

        when(journeyPlanningService.getRoutesByMode("BUS")).thenReturn(List.of(route));

        mockMvc.perform(get("/api/journeys/routes")
                        .param("mode", "BUS"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].routeNumber", is("M1")))
                .andExpect(jsonPath("$[0].mode", is("BUS")));
    }

    @Test
    void getRoutes_invalidMode_returnsBadRequest() throws Exception {
        when(journeyPlanningService.getRoutesByMode("INVALID")).thenThrow(IllegalArgumentException.class);

        mockMvc.perform(get("/api/journeys/routes")
                        .param("mode", "INVALID"))
                .andExpect(status().isBadRequest());
    }
}
