package com.example.demo.config;

import com.example.demo.entity.Account;
import com.example.demo.entity.DoctorProfile;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.DoctorProfileRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private final AccountRepository accountRepository;
    private final DoctorProfileRepository doctorProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(AccountRepository accountRepository,
                      DoctorProfileRepository doctorProfileRepository,
                      PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.doctorProfileRepository = doctorProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        String doctorEmail = "doctor@carelink.com";

        if (!accountRepository.existsByEmail(doctorEmail)) {
            // 1. Create Doctor Account
            Account doctorAccount = new Account();
            doctorAccount.setEmail(doctorEmail);
            doctorAccount.setPassword(passwordEncoder.encode("password123"));
            doctorAccount.setRole(Account.Role.DOCTOR);
            doctorAccount.setActive(true);
            doctorAccount = accountRepository.save(doctorAccount);

            // 2. Create Doctor Profile
            DoctorProfile doctorProfile = new DoctorProfile();
            doctorProfile.setAccount(doctorAccount);
            doctorProfile.setSpecialization("General Physician");
            doctorProfile.setConsultationFee(new BigDecimal("50.00"));
            doctorProfile.setYearsOfExperience(10);
            doctorProfileRepository.save(doctorProfile);

            System.out.println("Default Doctor created: " + doctorEmail);
        }
    }
}