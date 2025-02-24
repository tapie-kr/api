import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ApiClient } from "@/client";
import { UseFetchResult } from "@/types/hooks/fetch";
import { ApiUrl } from "@/url";

const client = new ApiClient();

export const useFetch = <TData>(
  url: string,
  config?: AxiosRequestConfig
): UseFetchResult<TData> => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const requestUrl = ApiUrl(url);

  const fetch = async () => {
    try {
      setIsPending(true);

      const response = await client.request<TData>({
        method: "GET",
        url: requestUrl,
        ...config,
      });

      setData(response);

      setIsSuccess(true);

      setIsError(false);
    } catch (err) {
      console.error(`[fetch](${url}) API Fetching hooks Error:`, err);

      setError(err as Error);

      setIsError(true);

      setIsSuccess(false);
    } finally {
      setIsPending(false);
    }
  };

  return {
    fetch,
    data,
    error,
    isPending,
    isSuccess,
    isError,
  };
};
