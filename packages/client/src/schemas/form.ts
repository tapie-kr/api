import { z } from "zod";
import { MemberUnit } from "@/constants/enum/unit-type";
import { Regex } from "@/constants/regex";
import { BaseResponse } from "@/schemas/base";

export const formDetailScheme = z.object({
  uuid: z.string().uuid(),
  formId: z.number(),
  memberUUID: z.string().uuid(),
  portfolioAssetUUID: z.string().uuid(),
  name: z.string().min(1, "이름은 필수입니다."),
  studentId: z.string(),
  googleEmail: z
    .string()
    .email("올바른 이메일 형식이 아닙니다.")
    .endsWith("@gmail.com", "구글 이메일(@gmail.com)만 사용 가능합니다."),
  unit: z.nativeEnum(MemberUnit),
  phoneNumber: z
    .string()
    .regex(Regex.koreanPhoneNumberPattern)
    .min(1, "전화번호는 필수입니다."),
  introduction: z.string().min(1, "자기소개는 필수입니다."),
  motivation: z.string().min(1, "지원동기는 필수입니다."),
  expectedActivities: z.string().min(1, "기대하는 활동은 필수입니다."),
  reasonToChoose: z.string().min(1, "선택이유는 필수입니다."),
  createdAt: z.string(),
  updatedAt: z.string(),
  submitted: z.boolean(),
});

export const formResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  startsAt: z.string(),
  endsAt: z.string(),
  active: z.boolean(),
});

export const formListResponseSchema = z.array(formResponseSchema);
export const formDetailListResponseSchema = z.array(formDetailScheme);
export const createFormSchema = formResponseSchema.omit({ id: true });
export const updateFormSchema = formResponseSchema.omit({ id: true }).partial();
export const deleteFormResponseSchema = z.object({});

// Type exports for Form API with consistent naming
export type FormDetailResponse = BaseResponse<typeof formDetailScheme>;
export type FormResponse = BaseResponse<typeof formResponseSchema>;
export type FormListResponse = BaseResponse<typeof formListResponseSchema>;
export type FormDetailListResponse = BaseResponse<
  typeof formDetailListResponseSchema
>;
export type CreateFormRequest = z.infer<typeof createFormSchema>;
export type UpdateFormRequest = z.infer<typeof updateFormSchema>;
export type DeleteFormResponseType = BaseResponse<
  typeof deleteFormResponseSchema
>;

// Public Form API Schemas
export const createFormApplicationSchema = formDetailScheme.pick({
  unit: true,
  phoneNumber: true,
  introduction: true,
  motivation: true,
  expectedActivities: true,
  reasonToChoose: true,
});
export const updateFormApplicationSchema =
  createFormApplicationSchema.partial();
export const formApplicationFile = z.object({ presignedUrl: z.string() });

// Type exports for Public Form API with consistent naming
export type CreateFormApplicationRequest = z.infer<
  typeof createFormApplicationSchema
>;
export type UpdateFormApplicationRequest = z.infer<
  typeof updateFormApplicationSchema
>;
export type FormApplicationFileResponse = BaseResponse<
  typeof formApplicationFile
>;

// New exports for frontend types (using "Data" suffix)
export type FormDetailData = z.infer<typeof formDetailScheme>;
export type FormResponseData = z.infer<typeof formResponseSchema>;
export type FormListResponseData = z.infer<typeof formListResponseSchema>;
export type FormDetailListResponseData = z.infer<
  typeof formDetailListResponseSchema
>;
export type CreateFormData = z.infer<typeof createFormSchema>;
export type UpdateFormData = z.infer<typeof updateFormSchema>;
export type DeleteFormData = z.infer<typeof deleteFormResponseSchema>;
export type CreateFormApplicationData = z.infer<
  typeof createFormApplicationSchema
>;
export type UpdateFormApplicationData = z.infer<
  typeof updateFormApplicationSchema
>;
export type FormApplicationFileData = z.infer<typeof formApplicationFile>;
