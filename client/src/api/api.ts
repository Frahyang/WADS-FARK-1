import axios from 'axios';

const API_BASE_URL = 'https://e2425-wads-l4bcg3-server.csbihub.id/';

export interface ApiErrorResponse {
  message: string;
  needsVerification?: boolean;
  email?: string;
}

export type TicketType =
  | "Equipment maintenance request"
  | "Supply replenishment"
  | "Requesting missing patient records"
  | "Compliance and safety"
  | "Reports of patient accidents"
  | "Account recovery"
  | "Inquiries about dentalign"
  | "Technical issues of website"
  | "Billing/payment of appointments"
  | "Filing complaint of service";

export interface CreateTicketPayload {
  title: string;
  description: string;
  assignee: string;
  type: TicketType;
  date_created: string;
  priority: "High" | "Medium" | "Low";
  status: "In Progress" | "Completed" | "Unseen";
}

export interface TicketUpdatePayload {
  status?: "In Progress" | "Completed" | "Unseen";
  priority?: "High" | "Medium" | "Low";
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authService = {
  signUp: async (userData: {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phoneNumber?: string;
  }) => {
    const response = await api.post('/service/user/signup', userData);
    return response.data;
  },

  signIn: async (credentials: {
    email: string;
    password: string;
  }) => {
    const response = await api.post('/service/user/signin', credentials);
    return response.data;
  },

  verifyOtp: async (email: string, otp: string) => {
    const response = await api.post('/service/user/verify-otp', { email, otp });
    return response.data;
  },

  resendOtp: async (email: string) => {
    const response = await api.post('/service/user/resend-otp', { email });
    return response.data;
  },

  logout: () => {
    // Remove token from both storage locations
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    // Remove any other auth-related data
    localStorage.removeItem('verificationEmail');
  }
};

export const ticketService = {
  getAllTickets: async () => {
    const response = await api.get('/service/tickets/get_tickets_all');
    return response.data;
  },

  getTicketsByOwnerId: async (ownerId: string) => {
    const response = await api.get(`/service/tickets/get_tickets_byOwnerId/${ownerId}`);
    return response.data;
  },

  createTicket: async (ownerId: string, ticketData: CreateTicketPayload) => {
    const response = await api.post(`/service/tickets/create_ticket/${ownerId}`, ticketData);
    return response.data;
  },

  updateTicket: async (ticketId: string, updates: TicketUpdatePayload) => {
    const response = await api.patch(`/service/tickets/update_status/${ticketId}`, updates);
    return response.data;
  },

  deleteTicket: async (ticketId: string) => {
    const response = await api.delete(`/service/tickets/delete_ticket/${ticketId}`);
    return response.data;
  },

  sendTicketResponse: async (ticketId: string, responseText: string) => {
    const response = await api.post(`/service/tickets/send_response/${ticketId}`, { response: responseText });
    return response.data;
  }
};

export default api;