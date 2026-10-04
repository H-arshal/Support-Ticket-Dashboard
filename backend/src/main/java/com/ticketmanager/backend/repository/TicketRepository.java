package com.ticketmanager.backend.repository;

import com.ticketmanager.backend.entity.Ticket;
import com.ticketmanager.backend.enums.Status;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String>, TicketRepositoryCustom {
    long countByStatus(Status status);
    Ticket findTopByOrderByTicketNumberDesc();
}
