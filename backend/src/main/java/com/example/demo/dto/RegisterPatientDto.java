// package com.example.demo.dto;

// import lombok.AllArgsConstructor;
// import lombok.Data;
// import lombok.NoArgsConstructor;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class RegisterPatientDto {
//     private String email;
//     private String password;
//     private String fullName;
//     private String bloodGroup;
//     private String emergencyContact;
// }
package com.example.demo.dto;

import com.example.demo.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterPatientDto {

    private String email;

    private String password;

    private String fullName;

    private Account.Role role;

    // Patient fields
    private String bloodGroup;

    private String emergencyContact;

    // Doctor fields
    private String specialization;

    private Integer experience;

    private BigDecimal consultationFee;
}