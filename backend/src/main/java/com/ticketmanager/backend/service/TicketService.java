package com.ticketmanager.backend.service;

import com.ticketmanager.backend.dto.*;
import com.ticketmanager.backend.entity.Ticket;
import com.ticketmanager.backend.enums.Priority;
import com.ticketmanager.backend.enums.Status;
import com.ticketmanager.backend.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;

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
        
        // MongoDB doesn't automatically insert created/updated dates unless we use @EnableMongoAuditing
        // For simplicity, we manually set them here or configure auditing. Let's set them manually.
        LocalDateTime now = LocalDateTime.now();
        ticket.setCreatedAt(now);
        ticket.setUpdatedAt(now);

        Ticket lastTicket = ticketRepository.findTopByOrderByTicketNumberDesc();
        Long nextNumber = (lastTicket != null && lastTicket.getTicketNumber() != null) ? lastTicket.getTicketNumber() + 1 : 1L;
        ticket.setTicketNumber(nextNumber);

        ticketRepository.save(ticket);
    }

    public Page<TicketResponseDto> getTickets(String search, Status status, Priority priority, Pageable pageable) {
        Page<Ticket> tickets = ticketRepository.findTicketsWithFilters(search, status, priority, pageable);
        return tickets.map(this::mapToResponseDto);
    }

    public TicketResponseDto getTicket(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));
        return mapToResponseDto(ticket);
    }

    public void updateTicket(String id, TicketUpdateDto dto) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));

        ticket.setStatus(dto.getStatus());
        ticket.setPriority(dto.getPriority());
        ticket.setUpdatedAt(LocalDateTime.now());

        ticketRepository.save(ticket);
    }

    public TicketSummaryDto getSummary() {
        long open = ticketRepository.countByStatus(Status.OPEN);
        long inProgress = ticketRepository.countByStatus(Status.IN_PROGRESS);
        long resolved = ticketRepository.countByStatus(Status.RESOLVED);
        long total = ticketRepository.count();

        return new TicketSummaryDto(total, open, inProgress, resolved);
    }

    private TicketResponseDto mapToResponseDto(Ticket ticket) {
        TicketResponseDto dto = new TicketResponseDto();
        dto.setId(ticket.getId());
        dto.setTicketNumber(ticket.getTicketNumber());
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
