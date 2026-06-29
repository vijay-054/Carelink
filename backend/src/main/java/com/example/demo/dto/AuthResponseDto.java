package com.example.demo.dto;

import com.example.demo.entity.Account;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {
    private String token;
    private String email;
    private Account.Role role;
}