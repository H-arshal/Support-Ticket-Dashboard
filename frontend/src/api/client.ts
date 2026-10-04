import axios from 'axios';
import type { Ticket, TicketCreateDto, TicketUpdateDto, TicketSummary, Page, Priority, Status } from '../types/ticket';

// We use the environment variable if present, otherwise default to our local Spring Boot server
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTickets = async (
  page = 0, 
  size = 10, 
  search?: string, 
  status?: Status, 
  priority?: Priority,
  sort = 'createdAt',
  direction = 'desc'
) => {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort,
    direction
  });
  
  if (search) params.append('search', search);
  if (status) params.append('status', status);
  if (priority) params.append('priority', priority);

  const response = await apiClient.get<Page<Ticket>>(`/tickets?${params.toString()}`);
  return response.data;
};

export const getTicket = async (id: string) => {
  const response = await apiClient.get<Ticket>(`/tickets/${id}`);
  return response.data;
};

export const createTicket = async (data: TicketCreateDto) => {
  const response = await apiClient.post('/tickets', data);
  return response.data;
};

export const updateTicket = async (id: string, data: TicketUpdateDto) => {
  const response = await apiClient.patch(`/tickets/${id}`, data);
  return response.data;
};

export const getTicketSummary = async () => {
  const response = await apiClient.get<TicketSummary>('/tickets/summary');
  return response.data;
};
