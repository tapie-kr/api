import { z } from 'zod';

export const createFormSchema = z.object({
  name: z.string().min(1, '폼 이름은 필수입니다.'),
  startsAt: z.date(),
  endsAt: z.date(),
});

export const updateFormSchema = createFormSchema.partial();

export type CreateApplyForm = z.infer<typeof createFormSchema>;
export type UpdateApplyForm = z.infer<typeof updateFormSchema>;
