package com.saj.controlador;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import jakarta.annotation.PostConstruct;
import java.util.TimeZone;

@SpringBootApplication
public class ControladorSajApplication {

    public static void main(String[] args) {
        SpringApplication.run(ControladorSajApplication.class, args);
    }

    @PostConstruct
    public void init() {
        // Define timezone padrão como São Paulo para toda a aplicação
        TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
    }
}
