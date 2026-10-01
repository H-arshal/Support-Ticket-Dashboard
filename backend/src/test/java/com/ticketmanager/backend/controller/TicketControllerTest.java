package com.ticketmanager.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ticketmanager.backend.dto.TicketCreateDto;
import com.ticketmanager.backend.enums.Priority;
import com.ticketmanager.backend.service.TicketService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(TicketController.class)
public class TicketControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private TicketService ticketService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void createTicket_WithMissingRequiredFields_ShouldReturnBadRequest() throws Exception {
        TicketCreateDto dto = new TicketCreateDto();
        // Missing title, description, customerEmail, priority

        mockMvc.perform(post("/api/tickets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.fieldErrors.title").exists())
                .andExpect(jsonPath("$.fieldErrors.description").exists())
                .andExpect(jsonPath("$.fieldErrors.customerEmail").exists())
                .andExpect(jsonPath("$.fieldErrors.priority").exists());
    }

    @Test
    void createTicket_WithInvalidEmail_ShouldReturnBadRequest() throws Exception {
        TicketCreateDto dto = new TicketCreateDto();
        dto.setTitle("Valid Title");
        dto.setDescription("Valid Description");
        dto.setPriority(Priority.HIGH);
        dto.setCustomerEmail("invalid-email"); // Invalid email format

        mockMvc.perform(post("/api/tickets")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error").value("VALIDATION_ERROR"))
                .andExpect(jsonPath("$.fieldErrors.customerEmail").value("Customer email must be valid"));
    }
}
