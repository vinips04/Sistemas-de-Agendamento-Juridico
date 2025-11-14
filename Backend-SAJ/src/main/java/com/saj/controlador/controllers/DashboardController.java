package com.saj.controlador.controllers;

import com.saj.controlador.dto.ApiResponse;
import com.saj.controlador.dto.DashboardStats;
import com.saj.controlador.dto.AppointmentWithDetails;
import com.saj.controlador.repositories.ClientRepository;
import com.saj.controlador.repositories.ProcessRepository;
import com.saj.controlador.repositories.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final ClientRepository clientRepository;
    private final ProcessRepository processRepository;
    private final AppointmentRepository appointmentRepository;

    // Endpoint para estatísticas do dashboard
    @GetMapping("/stats")
    public ResponseEntity<ApiResponse<DashboardStats>> getStats(
            @RequestParam String lawyerId) {

        // Validação básica do UUID
        UUID parsedLawyerId;
        try {
            parsedLawyerId = UUID.fromString(lawyerId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>("ID do advogado inválido.", null));
        }

        // Definindo o início e o fim da semana para a consulta
        LocalDateTime startOfWeek = LocalDate.now().atStartOfDay();
        LocalDateTime endOfWeek = LocalDate.now().plusDays(7).atStartOfDay();


        DashboardStats stats = DashboardStats.builder()
            .totalClients(clientRepository.count())
            .activeProcesses(processRepository.countByStatus("ATIVO"))
            .todayAppointments(appointmentRepository.countTodayByLawyer(
                parsedLawyerId, LocalDate.now()))
            .weekAppointments(appointmentRepository.countNextWeekByLawyer(
                parsedLawyerId, startOfWeek, endOfWeek)) // Passando LocalDateTime
            .build();

        return ResponseEntity.ok(new ApiResponse<>("Estatísticas carregadas com sucesso", stats));
    }

    // Endpoint para próximos agendamentos
    @GetMapping("/appointments")
    public ResponseEntity<ApiResponse<List<AppointmentWithDetails>>> getUpcomingAppointments(
            @RequestParam String lawyerId,
            @RequestParam(defaultValue = "5") int limit) {

        // Validação básica do UUID
        UUID parsedLawyerId;
        try {
            parsedLawyerId = UUID.fromString(lawyerId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse<>("ID do advogado inválido.", null));
        }

        Pageable pageable = PageRequest.of(0, limit);
        List<AppointmentWithDetails> appointments = appointmentRepository
            .findUpcomingWithDetailsByLawyer(parsedLawyerId, LocalDateTime.now(), pageable);

        return ResponseEntity.ok(new ApiResponse<>("Agendamentos carregados com sucesso", appointments));
    }
}
