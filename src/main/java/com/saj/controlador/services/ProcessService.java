package com.saj.controlador.services;

import com.saj.controlador.dto.ProcessDTO;
import com.saj.controlador.entities.Client;
import com.saj.controlador.entities.Process;
import com.saj.controlador.repositories.ClientRepository;
import com.saj.controlador.repositories.ProcessRepository;
import com.saj.controlador.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProcessService {

    @Autowired
    private ProcessRepository processRepository;

    @Autowired
    private ClientRepository clientRepository;

    public List<ProcessDTO> getAllProcesses() {
        return processRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ProcessDTO getProcessById(Long id) {
        Process process = processRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Process not found with id: " + id));
        return convertToDTO(process);
    }

    public ProcessDTO createProcess(ProcessDTO processDTO) {
        Process process = convertToEntity(processDTO);
        Process savedProcess = processRepository.save(process);
        return convertToDTO(savedProcess);
    }

    public ProcessDTO updateProcess(Long id, ProcessDTO processDTO) {
        Process existingProcess = processRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Process not found with id: " + id));

        Client client = clientRepository.findById(processDTO.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + processDTO.getClientId()));

        existingProcess.setNumber(processDTO.getNumber());
        existingProcess.setClient(client);
        existingProcess.setDescription(processDTO.getDescription());
        existingProcess.setStatus(processDTO.getStatus());

        Process updatedProcess = processRepository.save(existingProcess);
        return convertToDTO(updatedProcess);
    }

    public void deleteProcess(Long id) {
        if (!processRepository.existsById(id)) {
            throw new ResourceNotFoundException("Process not found with id: " + id);
        }
        processRepository.deleteById(id);
    }

    private ProcessDTO convertToDTO(Process process) {
        ProcessDTO dto = new ProcessDTO();
        dto.setId(process.getId());
        dto.setNumber(process.getNumber());
        dto.setClientId(process.getClient().getId());
        dto.setDescription(process.getDescription());
        dto.setStatus(process.getStatus());
        return dto;
    }

    private Process convertToEntity(ProcessDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + dto.getClientId()));
        Process process = new Process();
        process.setId(dto.getId());
        process.setNumber(dto.getNumber());
        process.setClient(client);
        process.setDescription(dto.getDescription());
        process.setStatus(dto.getStatus());
        return process;
    }
}
