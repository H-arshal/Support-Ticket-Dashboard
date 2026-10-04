package com.ticketmanager.backend.repository;

import com.ticketmanager.backend.entity.Ticket;
import com.ticketmanager.backend.enums.Priority;
import com.ticketmanager.backend.enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TicketRepositoryCustomImpl implements TicketRepositoryCustom {

    private final MongoTemplate mongoTemplate;

    public TicketRepositoryCustomImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public Page<Ticket> findTicketsWithFilters(String search, Status status, Priority priority, Pageable pageable) {
        Query query = new Query();

        if (search != null && !search.trim().isEmpty()) {
            Criteria searchCriteria = new Criteria().orOperator(
                    Criteria.where("title").regex(search, "i"),
                    Criteria.where("customerEmail").regex(search, "i")
            );
            query.addCriteria(searchCriteria);
        }

        if (status != null) {
            query.addCriteria(Criteria.where("status").is(status));
        }

        if (priority != null) {
            query.addCriteria(Criteria.where("priority").is(priority));
        }

        long total = mongoTemplate.count(query, Ticket.class);
        
        query.with(pageable);
        List<Ticket> tickets = mongoTemplate.find(query, Ticket.class);

        return new PageImpl<>(tickets, pageable, total);
    }
}
