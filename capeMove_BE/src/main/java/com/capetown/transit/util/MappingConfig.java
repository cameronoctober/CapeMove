package com.capetown.transit.util;

import com.capetown.transit.dto.*;
import com.capetown.transit.entity.*;
import org.mapstruct.*;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MappingConfig {

    MappingConfig INSTANCE = Mappers.getMapper(MappingConfig.class);

    JourneyPlanDTO journeyPlanToDto(JourneyPlan entity);

    JourneyPlan dtoToJourneyPlan(JourneyPlanDTO dto);

    @Mapping(target = "moderatedBy", source = "moderatedBy.id")
    IncidentReportDTO incidentReportToDto(IncidentReport entity);

    @Mapping(target = "moderatedBy", expression = "java(dto.getModeratedBy() != null ? userFromId(dto.getModeratedBy()) : null)")
    IncidentReport dtoToIncidentReport(IncidentReportDTO dto);

    default User userFromId(java.util.UUID id) {
        if (id == null) return null;
        User user = new User();
        user.setId(id);
        return user;
    }

    UserPreferenceDTO userPreferenceToDto(UserPreference entity);

    UserPreference dtoToUserPreference(UserPreferenceDTO dto);
}
