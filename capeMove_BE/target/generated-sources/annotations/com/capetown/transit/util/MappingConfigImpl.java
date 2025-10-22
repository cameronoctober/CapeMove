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
    date = "2025-10-16T14:09:08+0000",
    comments = "version: 1.5.3.Final, compiler: javac, environment: Java 17.0.16 (Ubuntu)"
)
@Component
public class MappingConfigImpl implements MappingConfig {

    @Override
    public JourneyPlanDTO journeyPlanToDto(JourneyPlan entity) {
        if ( entity == null ) {
            return null;
        }

        JourneyPlanDTO.JourneyPlanDTOBuilder journeyPlanDTO = JourneyPlanDTO.builder();

        journeyPlanDTO.origin( entity.getOrigin() );
        journeyPlanDTO.destination( entity.getDestination() );
        journeyPlanDTO.plannedAt( entity.getPlannedAt() );

        return journeyPlanDTO.build();
    }

    @Override
    public JourneyPlan dtoToJourneyPlan(JourneyPlanDTO dto) {
        if ( dto == null ) {
            return null;
        }

        JourneyPlan.JourneyPlanBuilder journeyPlan = JourneyPlan.builder();

        journeyPlan.origin( dto.getOrigin() );
        journeyPlan.destination( dto.getDestination() );
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
        incidentReportDTO.id( entity.getId() );
        incidentReportDTO.latitude( entity.getLatitude() );
        incidentReportDTO.longitude( entity.getLongitude() );
        incidentReportDTO.description( entity.getDescription() );
        incidentReportDTO.type( entity.getType() );
        incidentReportDTO.status( entity.getStatus() );
        incidentReportDTO.createdAt( entity.getCreatedAt() );
        incidentReportDTO.moderatedAt( entity.getModeratedAt() );

        return incidentReportDTO.build();
    }

    @Override
    public IncidentReport dtoToIncidentReport(IncidentReportDTO dto) {
        if ( dto == null ) {
            return null;
        }

        IncidentReport.IncidentReportBuilder incidentReport = IncidentReport.builder();

        incidentReport.id( dto.getId() );
        incidentReport.latitude( dto.getLatitude() );
        incidentReport.longitude( dto.getLongitude() );
        incidentReport.description( dto.getDescription() );
        incidentReport.type( dto.getType() );
        incidentReport.status( dto.getStatus() );
        incidentReport.createdAt( dto.getCreatedAt() );
        incidentReport.moderatedAt( dto.getModeratedAt() );

        incidentReport.moderatedBy( dto.getModeratedBy() != null ? userFromId(dto.getModeratedBy()) : null );

        return incidentReport.build();
    }

    @Override
    public UserPreferenceDTO userPreferenceToDto(UserPreference entity) {
        if ( entity == null ) {
            return null;
        }

        UserPreferenceDTO.UserPreferenceDTOBuilder userPreferenceDTO = UserPreferenceDTO.builder();

        List<String> list = entity.getPreferredModes();
        if ( list != null ) {
            userPreferenceDTO.preferredModes( new ArrayList<String>( list ) );
        }
        userPreferenceDTO.notifyOnIncidents( entity.isNotifyOnIncidents() );
        userPreferenceDTO.notifyOnDisruptions( entity.isNotifyOnDisruptions() );

        return userPreferenceDTO.build();
    }

    @Override
    public UserPreference dtoToUserPreference(UserPreferenceDTO dto) {
        if ( dto == null ) {
            return null;
        }

        UserPreference.UserPreferenceBuilder userPreference = UserPreference.builder();

        List<String> list = dto.getPreferredModes();
        if ( list != null ) {
            userPreference.preferredModes( new ArrayList<String>( list ) );
        }
        if ( dto.getNotifyOnIncidents() != null ) {
            userPreference.notifyOnIncidents( dto.getNotifyOnIncidents() );
        }
        if ( dto.getNotifyOnDisruptions() != null ) {
            userPreference.notifyOnDisruptions( dto.getNotifyOnDisruptions() );
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
