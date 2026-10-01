package com.ticketmanager.backend.service;

import com.ticketmanager.backend.dto.*;
import com.ticketmanager.backend.entity.Ticket;
import com.ticketmanager.backend.enums.Priority;
import com.ticketmanager.backend.enums.Status;
import com.ticketmanager.backend.repository.TicketRepository;
import com.ticketmanager.backend.specification.TicketSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;

    @Autowired
    public TicketService(TicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    public void createTicket(TicketCreateDto dto) {
        Ticket ticket = new Ticket();
        ticket.setTitle(dto.getTitle());
        ticket.setDescription(dto.getDescription());
        ticket.setCustomerEmail(dto.getCustomerEmail());
        ticket.setPriority(dto.getPriority());
        ticket.setStatus(Status.OPEN); // Default as per requirements

        ticketRepository.save(ticket);
    }

    public Page<TicketResponseDto> getTickets(String search, Status status, Priority priority, Pageable pageable) {
        Specification<Ticket> spec = TicketSpecification.getFilteredTickets(search, status, priority);
        Page<Ticket> tickets = ticketRepository.findAll(spec, pageable);
        return tickets.map(this::mapToResponseDto);
    }

    public TicketResponseDto getTicket(Long id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));
        return mapToResponseDto(ticket);
    }

    public void updateTicket(Long id, TicketUpdateDto dto) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));

        ticket.setStatus(dto.getStatus());
        ticket.setPriority(dto.getPriority());

        ticketRepository.save(ticket);
    }

    public TicketSummaryDto getSummary() {
        // According to requirements, summary counts represent the entire dataset
        List<Ticket> allTickets = ticketRepository.findAll();
        
        long total = allTickets.size();
        long open = allTickets.stream().filter(t -> t.getStatus() == Status.OPEN).count();
        long inProgress = allTickets.stream().filter(t -> t.getStatus() == Status.IN_PROGRESS).count();
        long resolved = allTickets.stream().filter(t -> t.getStatus() == Status.RESOLVED).count();

        return new TicketSummaryDto(total, open, inProgress, resolved);
    }

    private TicketResponseDto mapToResponseDto(Ticket ticket) {
        TicketResponseDto dto = new TicketResponseDto();
        dto.setId(ticket.getId());
        dto.setTitle(ticket.getTitle());
        dto.setDescription(ticket.getDescription());
        dto.setCustomerEmail(ticket.getCustomerEmail());
        dto.setPriority(ticket.getPriority());
        dto.setStatus(ticket.getStatus());
        dto.setCreatedAt(ticket.getCreatedAt());
        dto.setUpdatedAt(ticket.getUpdatedAt());
        return dto;
    }
}
