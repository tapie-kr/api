import { z } from 'zod';
import { BaseResponse } from './base';

export const formResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  startsAt: z.date(),
  endsAt: z.date(),
});
export const formListResponseSchema = z.array(formResponseSchema);

export const createFormSchema = z.object({
  name: z.string().min(1, '폼 이름은 필수입니다.'),
  startsAt: z.date(),
  endsAt: z.date(),
});

export const updateFormSchema = createFormSchema.partial();

export const deleteFormResponseSchema = z.object({});

export type FormResponse = BaseResponse<typeof formResponseSchema>;
export type FormListResponse = BaseResponse<typeof formListResponseSchema>;
export type CreateForm = z.infer<typeof createFormSchema>;
export type UpdateForm = z.infer<typeof updateFormSchema>;
export type DeleteFormResponse = BaseResponse<typeof deleteFormResponseSchema>;
