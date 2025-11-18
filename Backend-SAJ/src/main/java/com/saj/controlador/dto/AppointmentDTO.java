package com.saj.controlador.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class AppointmentDTO {
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private UUID id;

    @NotNull(message = "Data e hora são obrigatórios")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dateTime;

    @Min(value = 15, message = "A duração deve ser de pelo menos 15 minutos")
    private int durationMinutes;

    @NotNull(message = "ID do advogado é obrigatório")
    private UUID lawyerId;

    @NotNull(message = "ID do cliente é obrigatório")
    private UUID clientId;
    
    private UUID processId;
    
    private String description;
}
