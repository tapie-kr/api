import { BaseResponse } from '@/schemas/base';
import { z } from 'zod';

// Refresh Token
export const refreshTokenResponseSchema = z.string();
export type RefreshTokenResponse = BaseResponse<
  typeof refreshTokenResponseSchema
>;

// Me
export const meResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  iat: z.number(),
  exp: z.number(),
});
export type MeResponse = BaseResponse<typeof meResponseSchema>;
export type AuthMeType = z.infer<typeof meResponseSchema>;
