package com.saj.controlador.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentWithDetails {
    private UUID id;
    private LocalDateTime dateTime; // ISO 8601 format
    private Integer durationMinutes;
    private UUID lawyerId;
    private UUID clientId;
    private UUID processId;
    private String description;
    private String clientName;
    private String processNumber;
}
