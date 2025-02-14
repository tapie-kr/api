import { AxiosError } from 'axios'
import { ZodError } from 'zod'

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; error: { validationError?: ZodError; requestError?: AxiosError } };
