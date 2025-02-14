import { z } from 'zod'

export const createApplyFormSchema = z.object({
  name: z.string().min(1, '폼 이름은 필수입니다.'),
  startsAt: z.date(),
  endsAt: z.date()
})

export type CreateApplyForm = z.infer<typeof createApplyFormSchema>
