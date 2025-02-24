import { useState, useEffect } from 'react';
import { axiosInstance } from '@/lib/axios';
import { UseFetchResult } from '@/types/hooks/fetch';

export const useFetch = <T>(url: string): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<T>(url);
        setData(response as T);
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

  return { data, error, isPending, isSuccess, isError };
};
