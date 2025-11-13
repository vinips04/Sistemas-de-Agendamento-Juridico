package com.saj.controlador.controllers;

import com.saj.controlador.dto.ProcessDTO;
import com.saj.controlador.services.ProcessService;
import com.saj.controlador.util.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/processes")
public class ProcessController {

    @Autowired
    private ProcessService processService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProcessDTO>>> getAllProcesses() {
        List<ProcessDTO> processes = processService.getAllProcesses();
        return ResponseEntity.ok(new ApiResponse<>(true, "Processes retrieved successfully", processes));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProcessDTO>> getProcessById(@PathVariable Long id) {
        ProcessDTO process = processService.getProcessById(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Process retrieved successfully", process));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProcessDTO>> createProcess(@Valid @RequestBody ProcessDTO processDTO) {
        ProcessDTO createdProcess = processService.createProcess(processDTO);
        return new ResponseEntity<>(new ApiResponse<>(true, "Process created successfully", createdProcess), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProcessDTO>> updateProcess(@PathVariable Long id, @Valid @RequestBody ProcessDTO processDTO) {
        ProcessDTO updatedProcess = processService.updateProcess(id, processDTO);
        return ResponseEntity.ok(new ApiResponse<>(true, "Process updated successfully", updatedProcess));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProcess(@PathVariable Long id) {
        processService.deleteProcess(id);
        return ResponseEntity.ok(new ApiResponse<>(true, "Process deleted successfully", null));
    }
}
