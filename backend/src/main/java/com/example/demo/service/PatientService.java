package com.example.demo.service;

import com.example.demo.entity.PatientProfile;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.PatientProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientProfileRepository patientProfileRepository;

    public List<PatientProfile> getAllPatients() {
        return patientProfileRepository.findAll();
    }

    public void deletePatient(Long id) {
        if (!patientProfileRepository.existsById(id)) {
            throw new ResourceNotFoundException("Patient not found");
        }
        patientProfileRepository.deleteById(id);
    }
}