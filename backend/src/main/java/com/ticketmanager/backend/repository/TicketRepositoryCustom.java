package com.ticketmanager.backend.repository;

import com.ticketmanager.backend.entity.Ticket;
import com.ticketmanager.backend.enums.Priority;
import com.ticketmanager.backend.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TicketRepositoryCustom {
    Page<Ticket> findTicketsWithFilters(String search, Status status, Priority priority, Pageable pageable);
}
