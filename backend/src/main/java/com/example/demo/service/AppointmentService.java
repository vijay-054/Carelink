package com.example.demo.service;

import com.example.demo.dto.BookingRequestDto;
import com.example.demo.entity.Account;
import com.example.demo.entity.Appointment;
import com.example.demo.entity.AvailabilitySlot;
import com.example.demo.entity.DoctorProfile;
import com.example.demo.entity.PatientProfile;
import com.example.demo.exception.AppointmentLimitExceededException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.AvailabilitySlotRepository;
import com.example.demo.repository.DoctorProfileRepository;
import com.example.demo.repository.PatientProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final AccountRepository accountRepository;
    private final PatientProfileRepository patientProfileRepository;
    private final DoctorProfileRepository doctorProfileRepository;
    private final AvailabilitySlotRepository availabilitySlotRepository;

    /* =========================================================
       BOOK APPOINTMENT - PATIENT
    ========================================================= */

    @Transactional
    public Appointment bookAppointment(
            String email,
            BookingRequestDto dto) {

        Account account = accountRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Account not found"
                        )
                );

        PatientProfile patient =
                patientProfileRepository
                        .findByAccountId(account.getId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Patient profile not found"
                                )
                        );

        long pendingCount =
                appointmentRepository
                        .countByPatientIdAndStatus(
                                patient.getId(),
                                Appointment.AppointmentStatus.PENDING
                        );

        if (pendingCount >= 3) {

            throw new AppointmentLimitExceededException(
                    "Maximum of 3 pending appointments allowed. " +
                    "Please complete or cancel existing ones."
            );
        }

        AvailabilitySlot slot =
                availabilitySlotRepository
                        .findById(dto.getSlotId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Slot not found"
                                )
                        );

        if (slot.isBooked()) {

            throw new RuntimeException(
                    "Slot is already booked"
            );
        }

        /*
         * Mark selected slot as booked.
         */

        slot.setBooked(true);

        availabilitySlotRepository.save(slot);

        /*
         * IMPORTANT
         *
         * Doctor comes from the selected slot.
         *
         * Patient
         *    ↓
         * Selected Slot
         *    ↓
         * Doctor
         */

        Appointment appointment =
                Appointment.builder()
                        .patient(patient)
                        .doctor(slot.getDoctor())
                        .slot(slot)
                        .status(
                                Appointment.AppointmentStatus.PENDING
                        )
                        .reasonForVisit(
                                dto.getReasonForVisit()
                        )
                        .build();

        return appointmentRepository.save(
                appointment
        );
    }

    /* =========================================================
       CANCEL APPOINTMENT
    ========================================================= */

    @Transactional
    public void cancelAppointment(
            String email,
            Long appointmentId) {

        Appointment appointment =
                appointmentRepository
                        .findById(appointmentId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Appointment not found"
                                )
                        );

        String patientEmail =
                appointment
                        .getPatient()
                        .getAccount()
                        .getEmail();

        String doctorEmail =
                appointment
                        .getDoctor()
                        .getAccount()
                        .getEmail();

        /*
         * Only the patient or doctor involved
         * in the appointment can cancel it.
         */

        if (!patientEmail.equals(email)
                && !doctorEmail.equals(email)) {

            throw new RuntimeException(
                    "Unauthorized"
            );
        }

        if (appointment.getStatus()
                == Appointment.AppointmentStatus.CANCELLED
                ||
            appointment.getStatus()
                == Appointment.AppointmentStatus.COMPLETED) {

            throw new RuntimeException(
                    "Cannot cancel a CANCELLED or COMPLETED appointment"
            );
        }

        /*
         * Make slot available again.
         */

        appointment
                .getSlot()
                .setBooked(false);

        availabilitySlotRepository.save(
                appointment.getSlot()
        );

        appointment.setStatus(
                Appointment.AppointmentStatus.CANCELLED
        );

        appointmentRepository.save(
                appointment
        );
    }

    /* =========================================================
       GET PATIENT APPOINTMENTS
    ========================================================= */

    public List<Appointment> getPatientAppointments(
            String email) {

        Account account =
                accountRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Account not found"
                                )
                        );

        PatientProfile patient =
                patientProfileRepository
                        .findByAccountId(account.getId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Patient profile not found"
                                )
                        );

        return appointmentRepository.findByPatientId(
                patient.getId()
        );
    }

    /* =========================================================
       GET DOCTOR APPOINTMENTS
    ========================================================= */

    public List<Appointment> getDoctorAppointments(
            String email) {

        Account account =
                accountRepository
                        .findByEmail(email)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Account not found"
                                )
                        );

        DoctorProfile doctor =
                doctorProfileRepository
                        .findByAccountId(account.getId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Doctor profile not found"
                                )
                        );

        /*
         * IMPORTANT:
         *
         * This uses doctor.getId().
         *
         * Therefore only appointments belonging
         * to the logged-in doctor are returned.
         */

        return appointmentRepository.findByDoctorId(
                doctor.getId()
        );
    }

    /* =========================================================
       GET ALL APPOINTMENTS - ADMIN
    ========================================================= */

    public List<Appointment> getAllAppointments() {

        return appointmentRepository.findAll();
    }
}