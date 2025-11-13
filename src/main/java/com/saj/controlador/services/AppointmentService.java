package com.saj.controlador.services;

import com.saj.controlador.dto.AppointmentDTO;
import com.saj.controlador.entities.Appointment;
import com.saj.controlador.entities.Client;
import com.saj.controlador.entities.Process;
import com.saj.controlador.entities.User;
import com.saj.controlador.repositories.AppointmentRepository;
import com.saj.controlador.repositories.ClientRepository;
import com.saj.controlador.repositories.ProcessRepository;
import com.saj.controlador.repositories.UserRepository;
import com.saj.controlador.exceptions.ConflictException;
import com.saj.controlador.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private ProcessRepository processRepository;

    public List<AppointmentDTO> getAppointmentsByLawyer(Long lawyerId) {
        if (!userRepository.existsById(lawyerId)) {
            throw new ResourceNotFoundException("Lawyer not found with id: " + lawyerId);
        }
        return appointmentRepository.findByLawyerId(lawyerId).stream()
                .map(this::convertToDTO).collect(Collectors.toList());
    }

    public AppointmentDTO getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));
        return convertToDTO(appointment);
    }

    public AppointmentDTO createAppointment(AppointmentDTO appointmentDTO) {
        validateAppointmentConflict(appointmentDTO.getLawyerId(), appointmentDTO.getDateTime(), appointmentDTO.getDurationMinutes(), null);
        Appointment appointment = convertToEntity(appointmentDTO);
        Appointment savedAppointment = appointmentRepository.save(appointment);
        return convertToDTO(savedAppointment);
    }

    public AppointmentDTO updateAppointment(Long id, AppointmentDTO appointmentDTO) {
        Appointment existingAppointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Appointment not found with id: " + id));

        validateAppointmentConflict(appointmentDTO.getLawyerId(), appointmentDTO.getDateTime(), appointmentDTO.getDurationMinutes(), id);

        updateEntityFromDTO(existingAppointment, appointmentDTO);
        
        Appointment updatedAppointment = appointmentRepository.save(existingAppointment);
        return convertToDTO(updatedAppointment);
    }

    public void deleteAppointment(Long id) {
        if (!appointmentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Appointment not found with id: " + id);
        }
        appointmentRepository.deleteById(id);
    }

    private void validateAppointmentConflict(Long lawyerId, LocalDateTime start, int durationMinutes, Long appointmentId) {
        LocalDateTime end = start.plusMinutes(durationMinutes);
        appointmentRepository.findConflictingAppointment(lawyerId, start, end)
                .ifPresent(existing -> {
                    if (appointmentId == null || !existing.getId().equals(appointmentId)) {
                        throw new ConflictException("Appointment conflict for lawyer. Existing appointment at: " + existing.getDateTime());
                    }
                });
    }

    private AppointmentDTO convertToDTO(Appointment appointment) {
        AppointmentDTO dto = new AppointmentDTO();
        dto.setId(appointment.getId());
        dto.setDateTime(appointment.getDateTime());
        dto.setDurationMinutes(appointment.getDurationMinutes());
        dto.setLawyerId(appointment.getLawyer().getId());
        dto.setClientId(appointment.getClient().getId());
        if (appointment.getProcess() != null) {
            dto.setProcessId(appointment.getProcess().getId());
        }
        dto.setDescription(appointment.getDescription());
        return dto;
    }

    private Appointment convertToEntity(AppointmentDTO dto) {
        Appointment appointment = new Appointment();
        updateEntityFromDTO(appointment, dto);
        return appointment;
    }

    private void updateEntityFromDTO(Appointment appointment, AppointmentDTO dto) {
        User lawyer = userRepository.findById(dto.getLawyerId())
                .orElseThrow(() -> new ResourceNotFoundException("Lawyer not found with id: " + dto.getLawyerId()));
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + dto.getClientId()));
        
        Process process = null;
        if (dto.getProcessId() != null) {
            process = processRepository.findById(dto.getProcessId())
                    .orElseThrow(() -> new ResourceNotFoundException("Process not found with id: " + dto.getProcessId()));
        }

        appointment.setDateTime(dto.getDateTime());
        appointment.setDurationMinutes(dto.getDurationMinutes());
        appointment.setLawyer(lawyer);
        appointment.setClient(client);
        appointment.setProcess(process);
        appointment.setDescription(dto.getDescription());
    }
}
