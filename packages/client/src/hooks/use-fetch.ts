import { HttpMethod } from "@/constants/http-method";
import { apiRequest } from "@/request";
import { UseFetchResult } from "@/types/hooks/fetch";
import { ApiUrl } from "@/url";
import { AxiosRequestConfig } from "axios";
import { useState, useRef, useCallback } from "react";

export const useFetch = <TData>(
  url: string,
  config?: AxiosRequestConfig
): UseFetchResult<TData> => {
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const cacheKey = useRef<string | null>(null);
  const requestUrl = ApiUrl(url);

  // Alternative solution (if you can't change the interface)
  const fetch = useCallback(
    async (options?: { skipCache?: boolean }) => {
      setIsPending(true);
      const newCacheKey = JSON.stringify({ url: requestUrl, config });

      // Skip cache가 true이거나 cacheKey가 변경된 경우에만 데이터를 요청
      if (options?.skipCache || cacheKey.current !== newCacheKey) {
        cacheKey.current = newCacheKey;
      }

      try {
        const response = await apiRequest<TData>({
          method: HttpMethod.GET,
          url: requestUrl,
          ...config,
          ...(options?.skipCache && {
            params: {
              ...config?.params,
              _t: new Date().getTime(),
            },
          }),
        });

        setData(response);
        setIsSuccess(true);
        setIsError(false);
        // Don't return the response
      } catch (err) {
        console.error(`[fetch](${url}) API Fetching hooks Error:`, err);
        setError(err as Error);
        setIsError(true);
        setIsSuccess(false);
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    [requestUrl, config]
  );

  const refresh = useCallback(async () => {
    return fetch({ skipCache: true });
  }, [fetch]);

  return {
    fetch,
    refresh,
    data,
    error,
    isPending,
    isSuccess,
    isError,
  };
};
