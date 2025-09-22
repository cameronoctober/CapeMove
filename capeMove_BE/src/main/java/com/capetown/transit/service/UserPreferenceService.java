package com.capetown.transit.service;

import com.capetown.transit.dto.UserPreferenceDTO;
import com.capetown.transit.entity.User;
import com.capetown.transit.entity.UserPreference;
import com.capetown.transit.exception.ResourceNotFoundException;
import com.capetown.transit.repository.UserPreferenceRepository;
import com.capetown.transit.repository.UserRepository;
import com.capetown.transit.util.MappingConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserPreferenceService {

    private final UserPreferenceRepository userPreferenceRepository;
    private final UserRepository userRepository;
    private final MappingConfig mappingConfig;

    public UserPreferenceDTO getPreferences(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return userPreferenceRepository.findByUserId(user.getId())
                .map(mappingConfig::userPreferenceToDto)
                .orElseGet(() -> UserPreferenceDTO.builder()
                        .notifyOnIncidents(true)
                        .notifyOnDisruptions(true)
                        .build());
    }

    public UserPreferenceDTO updatePreferences(String username, UserPreferenceDTO dto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        UserPreference preference = userPreferenceRepository.findByUserId(user.getId())
                .orElse(UserPreference.builder().user(user).build());

        preference.setPreferredModes(dto.getPreferredModes());
        preference.setNotifyOnIncidents(dto.getNotifyOnIncidents());
        preference.setNotifyOnDisruptions(dto.getNotifyOnDisruptions());

        UserPreference saved = userPreferenceRepository.save(preference);
        return mappingConfig.userPreferenceToDto(saved);
    }
}
