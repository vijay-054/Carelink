package com.example.demo.service;

import com.example.demo.dto.AuthResponseDto;
import com.example.demo.dto.LoginRequestDto;
import com.example.demo.dto.RegisterPatientDto;

public interface AuthService {
    AuthResponseDto registerPatient(RegisterPatientDto dto);
    AuthResponseDto login(LoginRequestDto dto);
}