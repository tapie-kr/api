import { z } from 'zod';

export const createApplyFormSchema = z.object({
  name: z.string().min(1, '폼 이름은 필수입니다.'),
  startsAt: z.date(),
  endsAt: z.date(),
});

export const updateApplyFormSchema = createApplyFormSchema.partial();

export type CreateApplyForm = z.infer<typeof createApplyFormSchema>;
export type UpdateApplyForm = z.infer<typeof updateApplyFormSchema>;
