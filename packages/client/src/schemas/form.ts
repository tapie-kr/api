import { z } from 'zod';
import { baseResponseSchema } from './base';

export const createFormSchema = z.object({
  name: z.string().min(1, '폼 이름은 필수입니다.'),
  startsAt: z.date(),
  endsAt: z.date(),
});

export const createFormResponseSchema = baseResponseSchema(z.object({}));

export const updateFormSchema = createFormSchema.partial();

export type CreateForm = z.infer<typeof createFormSchema>;
export type CreateFormResponse = z.infer<typeof createFormResponseSchema>;
export type UpdateForm = z.infer<typeof updateFormSchema>;
