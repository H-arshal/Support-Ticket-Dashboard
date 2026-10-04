package com.ticketmanager.backend.controller;

import com.ticketmanager.backend.dto.*;
import com.ticketmanager.backend.enums.Priority;
import com.ticketmanager.backend.enums.Status;
import com.ticketmanager.backend.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createTicket(@Valid @RequestBody TicketCreateDto createDto) {
        ticketService.createTicket(createDto);
    }

    @GetMapping
    public Page<TicketResponseDto> getTickets(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) Priority priority,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sort,
            @RequestParam(defaultValue = "desc") String direction
    ) {
        // Security Fix: Cap pagination size to prevent memory exhaustion DoS attacks
        int safeSize = Math.min(size, 100);
        
        Sort.Direction sortDirection = Sort.Direction.fromString(direction);
        Pageable pageable = PageRequest.of(page, safeSize, Sort.by(sortDirection, sort));
        
        return ticketService.getTickets(search, status, priority, pageable);
    }

    @GetMapping("/{id}")
    public TicketResponseDto getTicket(@PathVariable String id) {
        return ticketService.getTicket(id);
    }

    @PatchMapping("/{id}")
    public void updateTicket(@PathVariable String id, @Valid @RequestBody TicketUpdateDto updateDto) {
        ticketService.updateTicket(id, updateDto);
    }

    @GetMapping("/summary")
    public TicketSummaryDto getSummary() {
        return ticketService.getSummary();
    }
}
