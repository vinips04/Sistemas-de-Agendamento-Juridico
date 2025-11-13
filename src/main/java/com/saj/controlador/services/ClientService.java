package com.saj.controlador.services;

import com.saj.controlador.dto.ClientDTO;
import com.saj.controlador.entities.Client;
import com.saj.controlador.repositories.ClientRepository;
import com.saj.controlador.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;

    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll().stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    public ClientDTO getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + id));
        return convertToDTO(client);
    }

    public ClientDTO createClient(ClientDTO clientDTO) {
        Client client = convertToEntity(clientDTO);
        Client savedClient = clientRepository.save(client);
        return convertToDTO(savedClient);
    }

    public ClientDTO updateClient(Long id, ClientDTO clientDTO) {
        Client existingClient = clientRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Client not found with id: " + id));

        existingClient.setName(clientDTO.getName());
        existingClient.setCpfCnpj(clientDTO.getCpfCnpj());
        existingClient.setEmail(clientDTO.getEmail());
        existingClient.setPhone(clientDTO.getPhone());

        Client updatedClient = clientRepository.save(existingClient);
        return convertToDTO(updatedClient);
    }

    public void deleteClient(Long id) {
        if (!clientRepository.existsById(id)) {
            throw new ResourceNotFoundException("Client not found with id: " + id);
        }
        clientRepository.deleteById(id);
    }

    private ClientDTO convertToDTO(Client client) {
        ClientDTO dto = new ClientDTO();
        dto.setId(client.getId());
        dto.setName(client.getName());
        dto.setCpfCnpj(client.getCpfCnpj());
        dto.setEmail(client.getEmail());
        dto.setPhone(client.getPhone());
        return dto;
    }

    private Client convertToEntity(ClientDTO dto) {
        Client client = new Client();
        client.setId(dto.getId());
        client.setName(dto.getName());
        client.setCpfCnpj(dto.getCpfCnpj());
        client.setEmail(dto.getEmail());
        client.setPhone(dto.getPhone());
        return client;
    }
}
