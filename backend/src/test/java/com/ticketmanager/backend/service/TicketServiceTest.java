package com.ticketmanager.backend.service;

import com.ticketmanager.backend.dto.TicketResponseDto;
import com.ticketmanager.backend.dto.TicketUpdateDto;
import com.ticketmanager.backend.entity.Ticket;
import com.ticketmanager.backend.enums.Priority;
import com.ticketmanager.backend.enums.Status;
import com.ticketmanager.backend.repository.TicketRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @InjectMocks
    private TicketService ticketService;

    @Test
    void getTickets_ShouldUsePaginationAndFiltering() {
        // Arrange
        PageRequest pageRequest = PageRequest.of(0, 10);
        Ticket ticket = new Ticket();
        ticket.setStatus(Status.OPEN);
        ticket.setPriority(Priority.HIGH);
        Page<Ticket> pagedResponse = new PageImpl<>(List.of(ticket));

        when(ticketRepository.findAll(any(Specification.class), eq(pageRequest)))
                .thenReturn(pagedResponse);

        // Act
        Page<TicketResponseDto> result = ticketService.getTickets("test", Status.OPEN, Priority.HIGH, pageRequest);

        // Assert
        assertEquals(1, result.getContent().size());
        verify(ticketRepository).findAll(any(Specification.class), eq(pageRequest));
    }

    @Test
    void updateTicket_ShouldPersistChanges() {
        // Arrange
        Ticket existingTicket = new Ticket();
        existingTicket.setId(1L);
        existingTicket.setStatus(Status.OPEN);
        existingTicket.setPriority(Priority.LOW);

        when(ticketRepository.findById(1L)).thenReturn(Optional.of(existingTicket));

        TicketUpdateDto updateDto = new TicketUpdateDto();
        updateDto.setStatus(Status.IN_PROGRESS);
        updateDto.setPriority(Priority.HIGH);

        // Act
        ticketService.updateTicket(1L, updateDto);

        // Assert
        ArgumentCaptor<Ticket> ticketCaptor = ArgumentCaptor.forClass(Ticket.class);
        verify(ticketRepository).save(ticketCaptor.capture());

        Ticket savedTicket = ticketCaptor.getValue();
        assertEquals(Status.IN_PROGRESS, savedTicket.getStatus());
        assertEquals(Priority.HIGH, savedTicket.getPriority());
    }
}
