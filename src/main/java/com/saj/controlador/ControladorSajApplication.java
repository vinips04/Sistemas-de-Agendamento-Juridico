package com.saj.controlador;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(info = @Info(title = "Controlador SAJ API", version = "1.0", description = "API para o Sistema de Agendamento Jurídico"))
public class ControladorSajApplication {

    public static void main(String[] args) {
        SpringApplication.run(ControladorSajApplication.class, args);
    }

}
