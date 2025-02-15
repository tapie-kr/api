import { z } from 'zod';
import { BaseResponse } from './base';

export const refreshTokenResponseSchema = z.string();

export const meResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export const googleCallbackResponseSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  name: z.string(),
});

export type RefreshTokenResponse = BaseResponse<
  typeof refreshTokenResponseSchema
>;
export type MeResponse = BaseResponse<typeof meResponseSchema>;
export type GoogleCallbackResponse = BaseResponse<
  typeof googleCallbackResponseSchema
>;
