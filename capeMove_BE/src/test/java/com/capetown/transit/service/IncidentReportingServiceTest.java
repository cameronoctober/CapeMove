package com.capetown.transit.service;

import com.capetown.transit.dto.IncidentReportDTO;
import com.capetown.transit.entity.IncidentReport;
import com.capetown.transit.entity.IncidentReport.Status;
import com.capetown.transit.entity.User;
import com.capetown.transit.exception.ResourceNotFoundException;
import com.capetown.transit.repository.IncidentReportRepository;
import com.capetown.transit.repository.UserRepository;
import com.capetown.transit.util.MappingConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class IncidentReportingServiceTest {

    @Mock
    private IncidentReportRepository incidentReportRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private MappingConfig mappingConfig;

    @InjectMocks
    private IncidentReportingService incidentReportingService;

    private User testUser;
    private IncidentReport incidentReport;
    private IncidentReportDTO incidentDTO;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        testUser = User.builder()
                .id(UUID.randomUUID())
                .username("user1")
                .build();

        incidentReport = IncidentReport.builder()
                .id(UUID.randomUUID())
                .user(testUser)
                .status(Status.PENDING)
                .description("Test incident")
                .createdAt(Instant.now())
                .build();

        incidentDTO = IncidentReportDTO.builder()
                .description("Test incident")
                .build();
    }

    @Test
    void createReport_validUser_createsReport() {
        when(userRepository.findByUsername("user1")).thenReturn(Optional.of(testUser));
        when(mappingConfig.dtoToIncidentReport(incidentDTO)).thenReturn(incidentReport);
        when(incidentReportRepository.save(any())).thenReturn(incidentReport);
        when(mappingConfig.incidentReportToDto(incidentReport)).thenReturn(incidentDTO);

        IncidentReportDTO created = incidentReportingService.createReport(incidentDTO, "user1");

        assertNotNull(created);
        verify(incidentReportRepository, times(1)).save(any());
    }

    @Test
    void createReport_userNotFound_throwsException() {
        when(userRepository.findByUsername("user1")).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> incidentReportingService.createReport(incidentDTO, "user1"));
    }
}
