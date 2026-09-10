// package com.example.demo.service;

// import com.example.demo.dto.AuthResponseDto;
// import com.example.demo.dto.LoginRequestDto;
// import com.example.demo.dto.RegisterPatientDto;
// import com.example.demo.entity.Account;
// import com.example.demo.entity.PatientProfile;
// import com.example.demo.exception.ResourceNotFoundException;
// import com.example.demo.repository.AccountRepository;
// import com.example.demo.repository.PatientProfileRepository;
// import com.example.demo.security.JwtService;
// import lombok.RequiredArgsConstructor;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.stereotype.Service;

// @Service
// @RequiredArgsConstructor
// public class AuthService {

//     private final AccountRepository accountRepository;
//     private final PatientProfileRepository patientProfileRepository;
//     private final PasswordEncoder passwordEncoder;
//     private final JwtService jwtService;
//     private final AuthenticationManager authenticationManager;
//     private final UserDetailsService userDetailsService;

//     public AuthResponseDto registerPatient(RegisterPatientDto dto) {
//         if (accountRepository.existsByEmail(dto.getEmail())) {
//             throw new RuntimeException("Email already exists");
//         }

//         Account account = Account.builder()
//                 .email(dto.getEmail())
//                 .password(passwordEncoder.encode(dto.getPassword()))
//                 .role(Account.Role.PATIENT)
//                 .active(true)
//                 .build();
//         accountRepository.save(account);

//         PatientProfile patientProfile = PatientProfile.builder()
//                 .account(account)
//                 .fullName(dto.getFullName())
//                 .bloodGroup(dto.getBloodGroup())
//                 .emergencyContact(dto.getEmergencyContact())
//                 .build();
//         patientProfileRepository.save(patientProfile);

//         UserDetails userDetails =
//                 userDetailsService.loadUserByUsername(dto.getEmail());
//         String token = jwtService.generateToken(userDetails);

//         return new AuthResponseDto(
//                 token, account.getEmail(), account.getRole());
//     }

//     public AuthResponseDto login(LoginRequestDto dto) {
//         authenticationManager.authenticate(
//                 new UsernamePasswordAuthenticationToken(
//                         dto.getEmail(),
//                         dto.getPassword()
//                 )
//         );

//         Account account = accountRepository.findByEmail(dto.getEmail())
//                 .orElseThrow(() -> new ResourceNotFoundException(
//                         "Account not found"));

//         UserDetails userDetails =
//                 userDetailsService.loadUserByUsername(dto.getEmail());
//         String token = jwtService.generateToken(userDetails);

//         return new AuthResponseDto(
//                 token, account.getEmail(), account.getRole());
//     }
// }
package com.example.demo.service;

import com.example.demo.dto.AuthResponseDto;
import com.example.demo.dto.LoginRequestDto;
import com.example.demo.dto.RegisterPatientDto;
import com.example.demo.entity.Account;
import com.example.demo.entity.DoctorProfile;
import com.example.demo.entity.PatientProfile;
import com.example.demo.exception.ResourceNotFoundException;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.DoctorProfileRepository;
import com.example.demo.repository.PatientProfileRepository;
import com.example.demo.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AccountRepository accountRepository;

    private final PatientProfileRepository patientProfileRepository;

    private final DoctorProfileRepository doctorProfileRepository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    private final UserDetailsService userDetailsService;


    /* =========================================================
       REGISTER
    ========================================================= */

    public AuthResponseDto registerPatient(RegisterPatientDto dto) {

        if (accountRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        /*
         * Role is now taken from the registration request.
         */

        if (dto.getRole() == null) {
            throw new RuntimeException("Account role is required");
        }


        /* =====================================================
           CREATE ACCOUNT
        ===================================================== */

        Account account = Account.builder()
                .email(dto.getEmail())
                .password(
                        passwordEncoder.encode(dto.getPassword())
                )
                .role(dto.getRole())
                .active(true)
                .build();

        accountRepository.save(account);


        /* =====================================================
           PATIENT
        ===================================================== */

        if (dto.getRole() == Account.Role.PATIENT) {

            PatientProfile patientProfile =
                    PatientProfile.builder()
                            .account(account)
                            .fullName(dto.getFullName())
                            .bloodGroup(dto.getBloodGroup())
                            .emergencyContact(
                                    dto.getEmergencyContact()
                            )
                            .build();

            patientProfileRepository.save(
                    patientProfile
            );
        }


        /* =====================================================
           DOCTOR
        ===================================================== */

        if (dto.getRole() == Account.Role.DOCTOR) {

            if (dto.getSpecialization() == null ||
                    dto.getSpecialization().trim().isEmpty()) {

                throw new RuntimeException(
                        "Specialization is required for doctors"
                );
            }

            if (dto.getExperience() == null) {

                throw new RuntimeException(
                        "Experience is required for doctors"
                );
            }

            if (dto.getConsultationFee() == null) {

                throw new RuntimeException(
                        "Consultation fee is required for doctors"
                );
            }


            DoctorProfile doctorProfile =
                    DoctorProfile.builder()
                            .account(account)
                            .specialization(
                                    dto.getSpecialization()
                            )
                            .yearsOfExperience(
                                    dto.getExperience()
                            )
                            .consultationFee(
                                    dto.getConsultationFee()
                            )
                            .build();

            doctorProfileRepository.save(
                    doctorProfile
            );
        }


        /* =====================================================
           CLINIC ADMIN
        ===================================================== */

        if (dto.getRole() == Account.Role.CLINIC_ADMIN) {

            // Clinic admin does not need a profile.
        }


        /* =====================================================
           GENERATE TOKEN
        ===================================================== */

        UserDetails userDetails =
                userDetailsService.loadUserByUsername(
                        dto.getEmail()
                );

        String token =
                jwtService.generateToken(userDetails);


        /* =====================================================
           RESPONSE
        ===================================================== */

        return new AuthResponseDto(
                token,
                account.getEmail(),
                account.getRole()
        );
    }


    /* =========================================================
       LOGIN
    ========================================================= */

    public AuthResponseDto login(LoginRequestDto dto) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );


        Account account =
                accountRepository
                        .findByEmail(dto.getEmail())
                        .orElseThrow(
                                () -> new ResourceNotFoundException(
                                        "Account not found"
                                )
                        );


        UserDetails userDetails =
                userDetailsService.loadUserByUsername(
                        dto.getEmail()
                );


        String token =
                jwtService.generateToken(
                        userDetails
                );


        return new AuthResponseDto(
                token,
                account.getEmail(),
                account.getRole()
        );
    }
}