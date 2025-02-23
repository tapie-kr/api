import { z } from 'zod';

export const baseResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  status:     z.number(),
  message:    z.string(),
  responseAt: z.string().datetime(),
  data:       dataSchema,
});

export type BaseResponse<T extends z.ZodTypeAny> = z.infer<
  ReturnType<typeof baseResponseSchema<T>>
>;
