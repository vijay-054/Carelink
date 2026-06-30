package com.example.demo.service;

import org.springframework.stereotype.Service;

import com.example.demo.dto.AuthResponseDto;
import com.example.demo.dto.LoginRequestDto;
import com.example.demo.dto.RegisterPatientDto;
@Service
public interface AuthService {
    AuthResponseDto registerPatient(RegisterPatientDto dto);
    AuthResponseDto login(LoginRequestDto dto);
}