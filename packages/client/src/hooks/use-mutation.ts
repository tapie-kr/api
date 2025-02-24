import { useState } from 'react';
import { ApiClient } from '@/client';
import { AxiosRequestConfig } from 'axios';
import { HttpMethod } from '@/constants/http-method';
import { UseMutationResult, MutateFunction } from '@/types/hooks/mutation';

const client = new ApiClient();

export const useMutation = <TData, TBody = void>(
  method: HttpMethod,
  url: string,
  config?: AxiosRequestConfig
): UseMutationResult<TData, TBody> => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const mutateFunction = async (body: TBody extends void ? void : TBody) => {
    try {
      setIsPending(true);
      const response = await client.request<TData>({
        method,
        url,
        data: body,
        ...config,
      });
      setData(response);
      setIsSuccess(true);
      setIsError(false);
    } catch (err) {
      console.error('API Fetching hooks Error:', err);
      setError(err as Error);
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setIsPending(false);
    }
  };

  const mutate = mutateFunction as MutateFunction<TData, TBody>;

  return { data, error, isPending, isSuccess, isError, mutate };
};
