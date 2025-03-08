import { useState, useCallback } from "react";
import { AxiosRequestConfig } from "axios";
import { ApiClient } from "@/client";
import { HttpMethod } from "@/constants/http-method";

function useDynamicMutation<TData, TParam, TBody = unknown>(
  method: HttpMethod,
  urlGenerator: (params: TParam) => string,
  config?: AxiosRequestConfig
) {
  const client = new ApiClient();
  const [data, setData] = useState<TData | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const mutate = useCallback(
    async (opts: { param: TParam; data?: TBody }) => {
      setIsPending(true);
      try {
        const url = urlGenerator(opts.param);
        const response = await client.request<TData>({
          method,
          url,
          data: opts.data,
          ...config,
        });
        setData(response);
        setIsSuccess(true);
        setIsError(false);
        return response;
      } catch (err) {
        console.error(
          `[dynamic mutate](${urlGenerator(opts.param)}) Error:`,
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
    [client, urlGenerator, method, config]
  );

  return { mutate, data, error, isPending, isSuccess, isError };
}

export default useDynamicMutation;
