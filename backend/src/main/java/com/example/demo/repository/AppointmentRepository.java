package com.example.demo.repository;

import com.example.demo.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    /* =========================================================
       PATIENT APPOINTMENTS
    ========================================================= */

    List<Appointment> findByPatientId(Long patientId);

    /* =========================================================
       DOCTOR APPOINTMENTS
    ========================================================= */

    List<Appointment> findByDoctorId(Long doctorId);

    /* =========================================================
       PENDING APPOINTMENT COUNT
    ========================================================= */

    long countByPatientIdAndStatus(
            Long patientId,
            Appointment.AppointmentStatus status
    );
}