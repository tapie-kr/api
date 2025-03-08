import { useState, useCallback, useRef, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import { ApiClient } from "@/client";
import { HttpMethod } from "@/constants/http-method";

function useDynamicFetch<TData, TParam>(
  urlGenerator: (params: TParam) => string,
  config?: AxiosRequestConfig
) {
  const client = new ApiClient();
  // Display data - what the UI sees
  const [data, setData] = useState<TData | null>(null);
  // Internal data - used for fresh fetches
  const [internalData, setInternalData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const cacheKey = useRef<string | null>(null);

  // Update the display data whenever internal data changes
  useEffect(() => {
    if (internalData !== null) {
      setData(internalData);
    }
  }, [internalData]);

  const fetch = useCallback(
    async (opts: { param: TParam; skipCache?: boolean }) => {
      setIsPending(true);
      const url = urlGenerator(opts.param);
      const newCacheKey = JSON.stringify({ url, config });

      // Only update cache key when needed
      if (opts.skipCache || cacheKey.current !== newCacheKey) {
        cacheKey.current = newCacheKey;
      }

      try {
        const response = await client.request<TData>({
          method: HttpMethod.GET,
          url,
          ...config,
          // Add cache-busting parameter when skipCache is true
          ...(opts.skipCache && {
            params: {
              ...config?.params,
              _t: new Date().getTime(),
            },
          }),
        });

        // Update internal data first
        setInternalData(response);
        setIsSuccess(true);
        setIsError(false);
        return response;
      } catch (err) {
        console.error(`[dynamic fetch](${url}) Error:`, err);
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

  const refetch = useCallback(
    async (param: TParam) => {
      return fetch({ param, skipCache: true });
    },
    [fetch]
  );

  return { fetch, refetch, data, error, isPending, isSuccess, isError };
}

export default useDynamicFetch;
