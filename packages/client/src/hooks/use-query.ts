import { useQuery as useTanstackQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';
import { apiRequest } from '@/request';

export function useQuery<T>(queryKey: any[],
  config: AxiosRequestConfig,
  options?: Omit<UseQueryOptions<T>, 'enabled'>) {
  const { refetch: fetch, ...rest } = useTanstackQuery<T>({
    queryKey,
    queryFn: () => apiRequest<T>(config),
    enabled: false,
    ...options,
  });

  return {
    fetch, ...rest,
  };
}
