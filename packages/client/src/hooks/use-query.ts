import { apiRequest } from '@/request';
import {
  UseQueryOptions,
  useQuery as useTanstackQuery,
} from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

export function useQuery<T>(
  queryKey: any[],
  config: AxiosRequestConfig,
  options?: Omit<UseQueryOptions<T>, 'enabled' | 'queryKey' | 'queryFn'>,
) {
  const { refetch: fetch, ...rest } = useTanstackQuery<T>({
    queryKey,
    queryFn: () => apiRequest<T>(config),
    enabled: false,
    ...options,
  });

  return {
    fetch,
    ...rest,
  };
}
