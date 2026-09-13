package com.example.demo.repository;

import com.example.demo.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Get appointments for a specific patient
    List<Appointment> findByPatientId(Long patientId);

    // Get appointments for a specific doctor
    List<Appointment> findByDoctorId(Long doctorId);

    // Count pending appointments for a patient
    long countByPatientIdAndStatus(
            Long patientId,
            Appointment.AppointmentStatus status
    );
}