import { z } from 'zod';
import { MemberUnit } from '@/constants/enum/unit-type';
import { Regex } from '@/constants/regex';

/**
 * 동아리 지원 Form 스키마
 * @description Form schema
 */
export const formSchema = z.object({
  id: z.number(),
  name: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  active: z.boolean(),
});
export const formListSchema = z.array(formSchema);

export type Form = z.infer<typeof formSchema>;
export type FormResponse = z.infer<typeof formSchema>;
export type FormListResponse = z.infer<typeof formListSchema>;

export const mutateFormSchema = formSchema.omit({
  id: true,
})
export type MutateForm = z.infer<typeof mutateFormSchema>;

/**
 * 동아리 지원 Form 응답 스키마
 * @description Form application schema
 */
export const formApplicationSchema = z.object({
  uuid: z.string().uuid(),
  formId: z.number(),
  memberUUID: z.string().uuid(),
  portfolioAssetUUID: z.string().uuid(),
  name: z.string(),
  studentId: z.string(),
  googleEmail: z.string(),
  unit: z.nativeEnum(MemberUnit),
  phoneNumber: z.string(),
  introduction: z.string(),
  motivation: z.string(),
  expectedActivities: z.string(),
  reasonToChoose: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  submitted: z.boolean(),
});
export const formApplicationList = z.array(formApplicationSchema);

export type FormApplication = z.infer<typeof formApplicationSchema>;
export type FormApplicationResponse = z.infer<typeof formApplicationSchema>;
export type FormApplicationListResponse = z.infer<typeof formApplicationList>;

/**
 * 동아리 지원 CRUD용 body 스키마
 * @description Create / Update form application schema
 */
export const MutateFormApplicationSchema = formApplicationSchema.pick({
  unit: true,
  phoneNumber: true,
  introduction: true,
  motivation: true,
  expectedActivities: true,
  reasonToChoose: true,
});
export type MutateFormApplication = z.infer<typeof MutateFormApplicationSchema>;
