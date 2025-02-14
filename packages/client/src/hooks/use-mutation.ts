import { useMutation as useTanstackMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { apiRequest } from '../request'

export function useMutation<T, V = unknown>(
  config: Omit<AxiosRequestConfig, 'data'>,
  options?: UseMutationOptions<T, unknown, V>
) {
  return useTanstackMutation<T, unknown, V>({
    mutationFn: (variables) => apiRequest<T>({
      ...config,
      data: variables,
    }),
    ...options,
  });
}
