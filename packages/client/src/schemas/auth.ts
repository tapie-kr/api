import { z } from "zod";
import { BaseResponse } from "@/schemas/base";

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

export type AuthMeType = z.infer<typeof meResponseSchema>;

// New exports for frontend props types (names ending with "Props" to avoid collision)
export type RefreshTokenResponseSchemaProps = z.infer<
  typeof refreshTokenResponseSchema
>;
export type MeResponseSchemaProps = z.infer<typeof meResponseSchema>;
export type GoogleCallbackResponseSchemaProps = z.infer<
  typeof googleCallbackResponseSchema
>;

// New exports for frontend types
export type RefreshTokenData = z.infer<typeof refreshTokenResponseSchema>;
export type MeData = z.infer<typeof meResponseSchema>;
export type GoogleCallbackData = z.infer<typeof googleCallbackResponseSchema>;
