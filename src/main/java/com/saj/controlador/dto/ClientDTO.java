package com.saj.controlador.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ClientDTO {
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String name;

    @NotBlank(message = "CPF/CNPJ is mandatory")
    private String cpfCnpj;

    @Email(message = "Email should be valid")
    private String email;
    
    private String phone;
}
