package com.saj.controlador.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ProcessDTO {
    private Long id;

    @NotBlank(message = "Process number is mandatory")
    private String number;

    @NotNull(message = "Client ID is mandatory")
    private Long clientId;
    
    private String description;

    @NotBlank(message = "Status is mandatory")
    private String status;
}
