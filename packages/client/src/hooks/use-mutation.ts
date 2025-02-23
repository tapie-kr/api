import { HttpMethod } from '@/constants/http-method';
import { apiRequest } from '@/request';
import {
  UseMutationOptions,
  useMutation as useTanstackMutation,
} from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

export function useMutation<T, V = unknown>(
  config: Omit<AxiosRequestConfig, 'data'> & {
    method: HttpMethod;
  },
  options?: UseMutationOptions<T, unknown, V>,
) {
  return useTanstackMutation<T, unknown, V>({
    mutationFn: (variables) =>
      apiRequest<T>({
        ...config,
        data: variables,
      }),
    ...options,
  });
}
