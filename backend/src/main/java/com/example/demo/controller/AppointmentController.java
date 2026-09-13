package com.example.demo.controller;

import com.example.demo.dto.BookingRequestDto;
import com.example.demo.entity.Appointment;
import com.example.demo.service.AppointmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;


    /* =========================================================
       PATIENT - BOOK APPOINTMENT
    ========================================================= */

    @PostMapping("/book")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<Appointment> book(
            @AuthenticationPrincipal UserDetails user,
            @Valid @RequestBody BookingRequestDto dto) {

        return ResponseEntity.ok(
                appointmentService.bookAppointment(
                        user.getUsername(),
                        dto
                )
        );
    }


    /* =========================================================
       PATIENT / DOCTOR - CANCEL APPOINTMENT
    ========================================================= */

    @PutMapping("/cancel/{id}")
    @PreAuthorize("hasAnyRole('PATIENT', 'DOCTOR')")
    public ResponseEntity<Void> cancel(
            @AuthenticationPrincipal UserDetails user,
            @PathVariable Long id) {

        appointmentService.cancelAppointment(
                user.getUsername(),
                id
        );

        return ResponseEntity.noContent().build();
    }


    /* =========================================================
       PATIENT - GET MY APPOINTMENTS
    ========================================================= */

    @GetMapping("/my")
    @PreAuthorize("hasRole('PATIENT')")
    public ResponseEntity<List<Appointment>> myAppointments(
            @AuthenticationPrincipal UserDetails user) {

        return ResponseEntity.ok(
                appointmentService.getPatientAppointments(
                        user.getUsername()
                )
        );
    }


    /* =========================================================
       DOCTOR - GET MY PATIENT APPOINTMENTS
    ========================================================= */

    @GetMapping("/doctor")
    @PreAuthorize("hasRole('DOCTOR')")
    public ResponseEntity<List<Appointment>> doctorAppointments(
            @AuthenticationPrincipal UserDetails user) {

        return ResponseEntity.ok(
                appointmentService.getDoctorAppointments(
                        user.getUsername()
                )
        );
    }


    /* =========================================================
       ADMIN - GET ALL APPOINTMENTS
    ========================================================= */

    @GetMapping
    @PreAuthorize("hasRole('CLINIC_ADMIN')")
    public ResponseEntity<List<Appointment>> getAllAppointments() {

        return ResponseEntity.ok(
                appointmentService.getAllAppointments()
        );
    }
}