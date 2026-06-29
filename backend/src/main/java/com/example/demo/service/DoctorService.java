package com.example.demo.service;

import com.example.demo.entity.DoctorProfile;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.DoctorProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorProfileRepository doctorProfileRepository;

    public List<DoctorProfile> getAllDoctors() {
        return doctorProfileRepository.findAll();
    }

    @Transactional
    public void deleteDoctor(Long id) {
        if (!doctorProfileRepository.existsById(id)) {
            throw new ResourceNotFoundException("Doctor not found with id: " + id);
        }
        doctorProfileRepository.deleteById(id);
    }

    @Transactional
    public DoctorProfile updateDoctorProfileByEmail(String email, DoctorProfile updatedData) {
        DoctorProfile existingProfile = doctorProfileRepository.findAll().stream()
                .filter(profile -> profile.getAccount() != null && email.equals(profile.getAccount().getEmail()))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Doctor profile not found for email: " + email));

        if (updatedData.getSpecialization() != null) {
            existingProfile.setSpecialization(updatedData.getSpecialization());
        }
        if (updatedData.getConsultationFee() != null) {
            existingProfile.setConsultationFee(updatedData.getConsultationFee());
        }
        if (updatedData.getYearsOfExperience() != null) {
            existingProfile.setYearsOfExperience(updatedData.getYearsOfExperience());
        }

        return doctorProfileRepository.save(existingProfile);
    }
}