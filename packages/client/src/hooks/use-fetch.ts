import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { ApiClient } from '@/client';
import { UseFetchResult } from '@/types/hooks/fetch';

const client = new ApiClient;

export const useFetch = <TData>(
  url: string,
  config?: AxiosRequestConfig,
): UseFetchResult<TData> => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsPending(true);

        const response = await client.request<TData>({
          method: 'GET',
          url,
          ...config,
        });

        setData(response);

        setIsSuccess(true);

        setIsError(false);
      } catch (err) {
        setError(err as Error);

        setIsError(true);

        setIsSuccess(false);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return {
    data, error, isPending, isSuccess, isError,
  };
};
