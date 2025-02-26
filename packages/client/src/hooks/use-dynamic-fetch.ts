import { useState, useCallback, useRef } from "react";
import { AxiosRequestConfig } from "axios";
import { ApiClient } from "@/client";
import { HttpMethod } from "@/constants/http-method";

function useDynamicFetch<TData, TParam>(
  urlGenerator: (params: TParam) => string,
  config?: AxiosRequestConfig
) {
  const client = new ApiClient();
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const cacheKey = useRef<string | null>(null);

  const fetch = useCallback(
    async (opts: { param: TParam; skipCache?: boolean }) => {
      setIsPending(true);
      const url = urlGenerator(opts.param);
      const newCacheKey = JSON.stringify({ url, config });
      
      // Skip cache가 true이거나 cacheKey가 변경된 경우에만 데이터를 요청
      if (opts.skipCache || cacheKey.current !== newCacheKey) {
        cacheKey.current = newCacheKey;
      }
      
      try {
        const response = await client.request<TData>({
          method: HttpMethod.GET,
          url,
          ...config,
          // Skip cache가 true일 경우에만 캐시를 사용하지 않음
          ...(opts.skipCache && { 
            params: { 
              ...config?.params, 
              _t: new Date().getTime() 
            } 
          }),
        });
        setData(response);
        setIsSuccess(true);
        setIsError(false);
        return response;
      } catch (err) {
        console.error(
          `[dynamic fetch](${url}) Error:`,
          err
        );
        setError(err as Error);
        setIsError(true);
        setIsSuccess(false);
        throw err;
      } finally {
        setIsPending(false);
      }
    },
    [client, urlGenerator, config]
  );

  const refresh = useCallback(
    async (param: TParam) => {
      return fetch({ param, skipCache: true });
    },
    [fetch]
  );

  return { fetch, refresh, data, error, isPending, isSuccess, isError };
}

export default useDynamicFetch;