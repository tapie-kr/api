import { AxiosRequestConfig } from 'axios';
import { ApiClient } from './client';

export const defaultApiClient = new ApiClient;

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  return defaultApiClient.request<T>(config);
}
