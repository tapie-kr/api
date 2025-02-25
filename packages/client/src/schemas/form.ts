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
export type FormResponse = BaseResponse<typeof formResponseSchema>;
export type FormListResponse = BaseResponse<typeof formListResponseSchema>;
export type CreateForm = z.infer<typeof createFormSchema>;
export type UpdateForm = z.infer<typeof updateFormSchema>;
export type DeleteFormResponse = BaseResponse<typeof deleteFormResponseSchema>;
export type FormDetailResponse = BaseResponse<typeof formDetailScheme>;

export type FormDetailListResponse = BaseResponse<
  typeof formDetailListResponseSchema
>;

// Public Form API
export const createFormApplicationSchema = formDetailScheme.pick({
  unit: true,
  phoneNumber: true,
  introduction: true,
  motivation: true,
  expectedActivities: true,
  reasonToChoose: true,
});

export const updateFormApplicationScheme =
  createFormApplicationSchema.partial();

export const formApplicationFile = z.object({ presignedUrl: z.string() });
export type CreateFormApplication = z.infer<typeof createFormApplicationSchema>;
export type UpdateFormApplication = z.infer<typeof updateFormApplicationScheme>;
export type FormApplicationFile = BaseResponse<typeof formApplicationFile>;

export type FormDetailType = z.infer<typeof formDetailScheme>;
export type FormResponseType = z.infer<typeof formResponseSchema>;
