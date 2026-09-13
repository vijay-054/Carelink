package com.example.demo.repository;

import com.example.demo.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Patient's appointments
    List<Appointment> findByPatientId(Long patientId);

    // Doctor's appointments
    List<Appointment> findByDoctorId(Long doctorId);

    // Patient pending appointment limit
    long countByPatientIdAndStatus(
            Long patientId,
            Appointment.AppointmentStatus status
    );
}