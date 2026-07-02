package com.example.demo.service;

import com.example.demo.dto.BookingRequestDto;
import com.example.demo.entity.*;
import com.example.demo.exception.AppointmentLimitExceededException;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.*;
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

    @Transactional
    public Appointment bookAppointment(String email, BookingRequestDto dto) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Account not found"));

        PatientProfile patient = patientProfileRepository
                .findByAccountId(account.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Patient profile not found"));

        long pendingCount = appointmentRepository.countByPatientIdAndStatus(
                patient.getId(), Appointment.AppointmentStatus.PENDING);

        if (pendingCount >= 3) {
            throw new AppointmentLimitExceededException(
                    "Maximum of 3 pending appointments allowed. " +
                    "Please complete or cancel existing ones.");
        }

        AvailabilitySlot slot = availabilitySlotRepository
                .findById(dto.getSlotId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Slot not found"));

        if (slot.isBooked()) {
            throw new RuntimeException("Slot is already booked");
        }

        slot.setBooked(true);
        availabilitySlotRepository.save(slot);

        Appointment appointment = Appointment.builder()
                .patient(patient)
                .doctor(slot.getDoctor())
                .slot(slot)
                .status(Appointment.AppointmentStatus.PENDING)
                .reasonForVisit(dto.getReasonForVisit())
                .build();

        return appointmentRepository.save(appointment);
    }

    @Transactional
    public void cancelAppointment(String email, Long appointmentId) {
        Appointment appointment = appointmentRepository
                .findById(appointmentId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Appointment not found"));

        String patientEmail =
                appointment.getPatient().getAccount().getEmail();
        String doctorEmail =
                appointment.getDoctor().getAccount().getEmail();

        if (!patientEmail.equals(email) && !doctorEmail.equals(email)) {
            throw new RuntimeException("Unauthorized");
        }

        if (appointment.getStatus() ==
                Appointment.AppointmentStatus.CANCELLED ||
            appointment.getStatus() ==
                Appointment.AppointmentStatus.COMPLETED) {
            throw new RuntimeException(
                    "Cannot cancel a CANCELLED or COMPLETED appointment");
        }

        appointment.getSlot().setBooked(false);
        availabilitySlotRepository.save(appointment.getSlot());

        appointment.setStatus(Appointment.AppointmentStatus.CANCELLED);
        appointmentRepository.save(appointment);
    }

    public List<Appointment> getPatientAppointments(String email) {
        Account account = accountRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Account not found"));

        if (account.getRole() == Account.Role.DOCTOR) {
            DoctorProfile doctor = doctorProfileRepository
                    .findByAccountId(account.getId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Doctor profile not found"));
            return appointmentRepository.findByPatientId(doctor.getId());
        }

        PatientProfile patient = patientProfileRepository
                .findByAccountId(account.getId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Patient profile not found"));

        return appointmentRepository.findByPatientId(patient.getId());
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}