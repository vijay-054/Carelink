package com.example.demo.service;

import com.example.demo.entity.Appointment;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultationService {

    private final AppointmentRepository appointmentRepository;

    private static final List<String> PROHIBITED_SUBSTANCES = List.of(
        "cocaine", "heroin", "meth", "fentanyl", "morphine"
    );

    @Transactional
    public void approveAppointment(String doctorEmail, Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Appointment not found"));

        if (!appointment.getDoctor().getAccount().getEmail().equals(doctorEmail)) {
            throw new RuntimeException("Unauthorized");
        }
        if (appointment.getStatus() != Appointment.AppointmentStatus.PENDING) {
            throw new RuntimeException("Appointment must be PENDING to approve");
        }

        appointment.setStatus(Appointment.AppointmentStatus.CONFIRMED);
        appointmentRepository.save(appointment);
    }

    @Transactional
    public void startConsultation(String doctorEmail, Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Appointment not found"));

        if (!appointment.getDoctor().getAccount().getEmail().equals(doctorEmail)) {
            throw new RuntimeException("Unauthorized");
        }
        if (appointment.getStatus() != Appointment.AppointmentStatus.CONFIRMED) {
            throw new RuntimeException("Appointment must be CONFIRMED to start");
        }

        appointment.setStatus(Appointment.AppointmentStatus.IN_PROGRESS);
        appointmentRepository.save(appointment);
    }

    @Transactional
    public void finalizeConsultation(String doctorEmail, Long appointmentId,
                                     String diagnosis, String medicationsJson) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                    "Appointment not found"));

        if (!appointment.getDoctor().getAccount().getEmail().equals(doctorEmail)) {
            throw new RuntimeException("Unauthorized");
        }

        String lowerMeds = medicationsJson.toLowerCase();
        for (String substance : PROHIBITED_SUBSTANCES) {
            if (lowerMeds.contains(substance)) {
                throw new RuntimeException(
                    "Prohibited substance found: " + substance);
            }
        }

        appointment.setDiagnosis(diagnosis);
        appointment.setMedications(medicationsJson);
        appointment.setStatus(Appointment.AppointmentStatus.COMPLETED);
        appointmentRepository.save(appointment);
    }
}