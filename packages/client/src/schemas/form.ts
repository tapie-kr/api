import { MemberUnit } from '@/constants/enum/unit-type';
import { BaseResponse } from '@/schemas/base';
import { z } from 'zod';

// Form
export const formResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  active: z.boolean(),
});
export type FormResponse = BaseResponse<typeof formResponseSchema>;
export type FormResponseType = z.infer<typeof formResponseSchema>;

// Create Form
export const createFormSchema = formResponseSchema.omit({ id: true });
export type CreateForm = z.infer<typeof createFormSchema>;

// Update Form
export const updateFormSchema = formResponseSchema.omit({ id: true }).partial();
export type UpdateForm = z.infer<typeof updateFormSchema>;

// Delete Form
export const deleteFormResponseSchema = z.string();
export type DeleteFormResponse = BaseResponse<typeof deleteFormResponseSchema>;

// Form List
export const formListResponseSchema = z.array(formResponseSchema);
export type FormListResponse = BaseResponse<typeof formListResponseSchema>;

// Form Application
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
export type FormApplicationResponse = BaseResponse<
  typeof formApplicationSchema
>;
export type FormApplicationType = z.infer<typeof formApplicationSchema>;

// Form Application List
export const formApplicationListResponseSchema = z.array(formApplicationSchema);
export type FormApplicationListResponse = BaseResponse<
  typeof formApplicationListResponseSchema
>;

// Delete Form Application
export const deleteFormApplicationResponseSchema = z.string();
export type DeleteFormApplicationResponse = BaseResponse<
  typeof deleteFormApplicationResponseSchema
>;

// Public Create Form Application
export const createFormApplicationSchema = formApplicationSchema.pick({
  unit: true,
  phoneNumber: true,
  introduction: true,
  motivation: true,
  expectedActivities: true,
  reasonToChoose: true,
});
export type CreateFormApplication = z.infer<typeof createFormApplicationSchema>;

// Public Update Form Application
export const updateFormApplicationScheme =
  createFormApplicationSchema.partial();
export type UpdateFormApplication = z.infer<typeof updateFormApplicationScheme>;

// Public Form Application File
export const formApplicationFile = z.object({ presignedUrl: z.string() });
export type FormApplicationFile = BaseResponse<typeof formApplicationFile>;
