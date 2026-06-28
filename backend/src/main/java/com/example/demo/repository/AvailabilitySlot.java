package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "availability_slots")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvailabilitySlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private DoctorProfile doctor;

    @Column(nullable = false)
    private LocalDateTime startTime;

    @Column(name = "end_time", nullable = false)
    private LocalDateTime endTime;

    @Builder.Default
    @Column(name = "booked", nullable = false)
    private Boolean booked = false;

    public Boolean getBooked() {
        return booked;
    }
}