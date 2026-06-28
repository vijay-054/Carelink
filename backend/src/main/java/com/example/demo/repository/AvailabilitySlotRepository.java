package com.example.demo.repository;

import com.example.demo.entity.AvailabilitySlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AvailabilitySlotRepository extends JpaRepository<AvailabilitySlot, Long> {
    List<AvailabilitySlot> findByDoctorIdAndBookedFalse(Long doctorId);
    List<AvailabilitySlot> findByDoctorId(Long doctorId);

    @Query("SELECT COUNT(s) > 0 FROM AvailabilitySlot s WHERE s.doctor.id = :doctorId " +
           "AND s.startTime < :end AND s.endTime > :start")
    boolean existsOverlapping(Long doctorId, LocalDateTime start, LocalDateTime end);
}