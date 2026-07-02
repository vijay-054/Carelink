package com.example.demo.repository;

import com.example.demo.entity.AvailabilitySlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AvailabilitySlotRepository
        extends JpaRepository<AvailabilitySlot, Long> {

    @Query("SELECT s FROM AvailabilitySlot s WHERE s.doctor.id = :doctorId AND s.booked = false")
    List<AvailabilitySlot> findByDoctorIdAndBookedFalse(
            @Param("doctorId") Long doctorId);

    List<AvailabilitySlot> findByDoctorId(Long doctorId);

    @Query("SELECT COUNT(s) > 0 FROM AvailabilitySlot s " +
           "WHERE s.doctor.id = :doctorId " +
           "AND s.startTime < :end AND s.endTime > :start")
    boolean existsOverlapping(@Param("doctorId") Long doctorId,
                              @Param("start") LocalDateTime start,
                              @Param("end") LocalDateTime end);
}