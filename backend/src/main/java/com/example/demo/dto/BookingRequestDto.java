package com.example.demo.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDto {

    @NotNull
    private Long slotId;

    @NotNull
    private String reasonForVisit;
}