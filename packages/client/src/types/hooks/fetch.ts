export interface UseFetchResult<TData> {
  fetch:     () => Promise<void>;
  refresh:   () => Promise<void>;
  data:      TData | null;
  error:     Error | null;
  isPending: boolean;
  isSuccess: boolean;
  isError:   boolean;
}
