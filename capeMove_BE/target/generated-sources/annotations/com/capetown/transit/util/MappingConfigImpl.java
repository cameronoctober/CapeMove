package com.capetown.transit.util;

import com.capetown.transit.dto.IncidentReportDTO;
import com.capetown.transit.dto.JourneyPlanDTO;
import com.capetown.transit.dto.UserPreferenceDTO;
import com.capetown.transit.entity.IncidentReport;
import com.capetown.transit.entity.JourneyPlan;
import com.capetown.transit.entity.User;
import com.capetown.transit.entity.UserPreference;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-09-22T17:45:50+0200",
    comments = "version: 1.5.3.Final, compiler: Eclipse JDT (IDE) 3.43.0.v20250819-1513, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class MappingConfigImpl implements MappingConfig {

    @Override
    public JourneyPlanDTO journeyPlanToDto(JourneyPlan entity) {
        if ( entity == null ) {
            return null;
        }

        JourneyPlanDTO.JourneyPlanDTOBuilder journeyPlanDTO = JourneyPlanDTO.builder();

        journeyPlanDTO.destination( entity.getDestination() );
        journeyPlanDTO.origin( entity.getOrigin() );
        journeyPlanDTO.plannedAt( entity.getPlannedAt() );

        return journeyPlanDTO.build();
    }

    @Override
    public JourneyPlan dtoToJourneyPlan(JourneyPlanDTO dto) {
        if ( dto == null ) {
            return null;
        }

        JourneyPlan.JourneyPlanBuilder journeyPlan = JourneyPlan.builder();

        journeyPlan.destination( dto.getDestination() );
        journeyPlan.origin( dto.getOrigin() );
        journeyPlan.plannedAt( dto.getPlannedAt() );

        return journeyPlan.build();
    }

    @Override
    public IncidentReportDTO incidentReportToDto(IncidentReport entity) {
        if ( entity == null ) {
            return null;
        }

        IncidentReportDTO.IncidentReportDTOBuilder incidentReportDTO = IncidentReportDTO.builder();

        incidentReportDTO.moderatedBy( entityModeratedById( entity ) );
        incidentReportDTO.createdAt( entity.getCreatedAt() );
        incidentReportDTO.description( entity.getDescription() );
        incidentReportDTO.id( entity.getId() );
        incidentReportDTO.latitude( entity.getLatitude() );
        incidentReportDTO.longitude( entity.getLongitude() );
        incidentReportDTO.moderatedAt( entity.getModeratedAt() );
        incidentReportDTO.status( entity.getStatus() );
        incidentReportDTO.type( entity.getType() );

        return incidentReportDTO.build();
    }

    @Override
    public IncidentReport dtoToIncidentReport(IncidentReportDTO dto) {
        if ( dto == null ) {
            return null;
        }

        IncidentReport.IncidentReportBuilder incidentReport = IncidentReport.builder();

        incidentReport.createdAt( dto.getCreatedAt() );
        incidentReport.description( dto.getDescription() );
        incidentReport.id( dto.getId() );
        incidentReport.latitude( dto.getLatitude() );
        incidentReport.longitude( dto.getLongitude() );
        incidentReport.moderatedAt( dto.getModeratedAt() );
        incidentReport.status( dto.getStatus() );
        incidentReport.type( dto.getType() );

        incidentReport.moderatedBy( dto.getModeratedBy() != null ? userFromId(dto.getModeratedBy()) : null );

        return incidentReport.build();
    }

    @Override
    public UserPreferenceDTO userPreferenceToDto(UserPreference entity) {
        if ( entity == null ) {
            return null;
        }

        UserPreferenceDTO.UserPreferenceDTOBuilder userPreferenceDTO = UserPreferenceDTO.builder();

        userPreferenceDTO.notifyOnDisruptions( entity.isNotifyOnDisruptions() );
        userPreferenceDTO.notifyOnIncidents( entity.isNotifyOnIncidents() );
        List<String> list = entity.getPreferredModes();
        if ( list != null ) {
            userPreferenceDTO.preferredModes( new ArrayList<String>( list ) );
        }

        return userPreferenceDTO.build();
    }

    @Override
    public UserPreference dtoToUserPreference(UserPreferenceDTO dto) {
        if ( dto == null ) {
            return null;
        }

        UserPreference.UserPreferenceBuilder userPreference = UserPreference.builder();

        if ( dto.getNotifyOnDisruptions() != null ) {
            userPreference.notifyOnDisruptions( dto.getNotifyOnDisruptions() );
        }
        if ( dto.getNotifyOnIncidents() != null ) {
            userPreference.notifyOnIncidents( dto.getNotifyOnIncidents() );
        }
        List<String> list = dto.getPreferredModes();
        if ( list != null ) {
            userPreference.preferredModes( new ArrayList<String>( list ) );
        }

        return userPreference.build();
    }

    private UUID entityModeratedById(IncidentReport incidentReport) {
        if ( incidentReport == null ) {
            return null;
        }
        User moderatedBy = incidentReport.getModeratedBy();
        if ( moderatedBy == null ) {
            return null;
        }
        UUID id = moderatedBy.getId();
        if ( id == null ) {
            return null;
        }
        return id;
    }
}
