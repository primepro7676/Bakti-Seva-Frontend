import type { Request } from "express";

export interface ApiSuccessResponse<T = unknown> {
  success: true;
  message?: string;
  data?: T;
  reply?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
}

export interface ChatbotMessageRequest {
  message: string;
}

export interface ContactFormRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface EnquiryFormRequest {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

export type ValidatedRequest<T> = Request & {
  validated: T;
};
