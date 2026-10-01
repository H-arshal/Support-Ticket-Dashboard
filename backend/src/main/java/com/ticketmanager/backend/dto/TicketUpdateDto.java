package com.ticketmanager.backend.dto;

import com.ticketmanager.backend.enums.Priority;
import com.ticketmanager.backend.enums.Status;
import jakarta.validation.constraints.NotNull;

public class TicketUpdateDto {

    @NotNull(message = "Status is required")
    private Status status;

    @NotNull(message = "Priority is required")
    private Priority priority;

    // Getters and Setters
    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }
}
