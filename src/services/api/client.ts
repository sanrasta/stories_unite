/**
 * API Client
 * 
 * Base HTTP client for backend API communication.
 */

import { getEnv } from '@/config/env';
import { Logger } from '@/shared/lib/logger';

const logger = Logger.createLogger('ApiClient');

export interface ApiResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
}

class ApiClient {
  private baseUrl: string;
  private authToken: string | null = null;

  constructor() {
    this.baseUrl = getEnv().API_BASE_URL;
  }

  setAuthToken(token: string | null): void {
    this.authToken = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpoint);
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpoint, body);
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpoint, body);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpoint);
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      logger.debug(`${method} ${endpoint}`);

      const response = await fetch(url, {
        method,
        headers: this.getHeaders(),
        body: body ? JSON.stringify(body) : undefined,
      });

      const data = await response.json();

      if (!response.ok) {
        logger.error(`API Error: ${response.status}`, { endpoint, data });
        throw {
          message: data.message || 'Request failed',
          code: data.code || 'UNKNOWN_ERROR',
          status: response.status,
        } as ApiError;
      }

      return {
        data,
        status: response.status,
        ok: true,
      };
    } catch (error) {
      if ((error as ApiError).status) {
        throw error;
      }

      logger.error('Network error', { endpoint, error });
      throw {
        message: 'Network request failed',
        code: 'NETWORK_ERROR',
        status: 0,
      } as ApiError;
    }
  }
}

export const apiClient = new ApiClient();
export default apiClient;

