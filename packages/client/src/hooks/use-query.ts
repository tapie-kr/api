import {
  UseQueryOptions,
  useQuery as useTanstackQuery,
} from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { apiRequest } from '../request';

export function useQuery<T>(
  queryKey: string[],
  config: AxiosRequestConfig,
  options?: UseQueryOptions<T>,
) {
  return useTanstackQuery<T>({
    queryKey,
    queryFn: () => apiRequest<T>(config),
    ...options,
  });
}
