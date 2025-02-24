export interface UseFetchResult<TData> {
  data:      TData | null;
  error:     Error | null;
  isPending: boolean;
  isSuccess: boolean;
  isError:   boolean;
}
