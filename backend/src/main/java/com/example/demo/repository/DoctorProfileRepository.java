package com.example.demo.repository;

import com.example.demo.entity.DoctorProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DoctorProfileRepository
        extends JpaRepository<DoctorProfile, Long> {
    Optional<DoctorProfile> findByAccountId(Long accountId);
    boolean existsByAccountId(Long accountId);
}