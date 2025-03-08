export type MutateFunction<_, TBody> = TBody extends void
  ? () => Promise<void>
  : (body: TBody) => Promise<void>;

export interface UseMutationResult<TData, TBody> {
  data:      TData | null;
  error:     Error | null;
  isPending: boolean;
  isSuccess: boolean;
  isError:   boolean;
  mutate:    MutateFunction<TData, TBody>;
}
