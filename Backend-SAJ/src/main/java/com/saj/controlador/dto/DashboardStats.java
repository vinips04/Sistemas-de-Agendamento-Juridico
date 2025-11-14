package com.saj.controlador.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private Long totalClients;
    private Long activeProcesses;
    private Long todayAppointments;
    private Long weekAppointments;
}
