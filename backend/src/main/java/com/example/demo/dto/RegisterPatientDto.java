package com.example.demo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterPatientDto {
    private String email;
    private String password;
    private String fullName;
    private String bloodGroup;
    private String emergencyContact;
} 