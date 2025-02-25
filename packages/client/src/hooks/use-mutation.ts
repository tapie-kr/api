import { HttpMethod } from '@/constants/http-method';
import { apiRequest } from '@/request';
import { MutateFunction, UseMutationResult } from '@/types/hooks/mutation';
import { ApiUrl } from '@/url';
import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';

export const useMutation = <TData, TBody = void>(
  method: HttpMethod,
  url: string,
  config?: AxiosRequestConfig,
): UseMutationResult<TData, TBody> => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const requestUrl = ApiUrl(url);

  const mutateFunction = async (body: TBody extends void ? void : TBody) => {
    try {
      setIsPending(true);

      const response = await apiRequest<TData>({
        method,
        url: requestUrl,
        data: body,
        ...config,
      });

      setData(response);

      setIsSuccess(true);

      setIsError(false);
    } catch (err) {
      console.error(`[mutate](${url}) API Fetching hooks Error:`, err);

      setError(err as Error);

      setIsError(true);

      setIsSuccess(false);
    } finally {
      setIsPending(false);
    }
  };

  const mutate = mutateFunction as MutateFunction<TData, TBody>;

  return {
    data,
    error,
    isPending,
    isSuccess,
    isError,
    mutate,
  };
};
