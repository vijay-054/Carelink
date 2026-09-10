// package com.example.demo.entity;

// import com.fasterxml.jackson.annotation.JsonIgnore;
// import jakarta.persistence.*;
// import lombok.*;
// import java.math.BigDecimal;
// import java.util.List;

// @Entity
// @Table(name = "doctor_profiles")
// @Getter
// @Setter
// @NoArgsConstructor
// @AllArgsConstructor
// @Builder
// public class DoctorProfile {

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @OneToOne
//     @JoinColumn(name = "account_id", nullable = false)
//     private Account account;

//     @Column(nullable = false)
//     private String specialization;

//     @Column(name = "consultation_fee", nullable = false)
//     private BigDecimal consultationFee;

//     @Column
//     private Integer yearsOfExperience;

//     @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
//     @JsonIgnore
//     private List<AvailabilitySlot> availabilitySlots;
// }