package com.example.demo.service;

import com.example.demo.entity.AvailabilitySlot;
import com.example.demo.entity.DoctorProfile;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.AvailabilitySlotRepository;
import com.example.demo.repository.DoctorProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleService {

    private final AvailabilitySlotRepository availabilitySlotRepository;
    private final AccountRepository accountRepository;
    private final DoctorProfileRepository doctorProfileRepository;

    @Transactional
    public void createSlot(String doctorEmail,
                           LocalDateTime start,
                           LocalDateTime end) {
        var account = accountRepository.findByEmail(doctorEmail)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Account not found"));

        DoctorProfile doctor = doctorProfileRepository
                .findByAccountId(account.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Doctor profile not found"));

        boolean overlapping = availabilitySlotRepository
                .existsOverlapping(doctor.getId(), start, end);

        if (overlapping) {
            throw new RuntimeException("Overlapping slot already exists.");
        }

        AvailabilitySlot slot = AvailabilitySlot.builder()
                .doctor(doctor)
                .startTime(start)
                .endTime(end)
                .booked(false)
                .build();

        availabilitySlotRepository.save(slot);
    }

    public List<AvailabilitySlot> getAvailableSlots(Long doctorId) {
        return availabilitySlotRepository.findByDoctorIdAndBookedFalse(doctorId);
    }

    public List<AvailabilitySlot> getDoctorSlots(String email) {
        var account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Account not found"));

        DoctorProfile doctor = doctorProfileRepository
                .findByAccountId(account.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Doctor profile not found"));

        return availabilitySlotRepository.findByDoctorId(doctor.getId());
    }
}