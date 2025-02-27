import { MemberRole } from '@/constants/enum/member-role';
import { MemberUnit } from '@/constants/enum/unit-type';
import { MemberSkill as MemberSkillEnum } from '@/enum'
import { BaseResponse } from '@/schemas/base';
import { z } from 'zod';
import { awardSchema } from './competition'

/**
 * 멤버 스키마 (상세 아님)
 * @description Member schema
 */
export const memberSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  studentID: z.number(),
  username: z.string(),
  googleEmail: z.string(),
  role: z.nativeEnum(MemberRole),
  unit: z.nativeEnum(MemberUnit),
  generation: z.number(),
  profileUri: z.string(),
})
export const memberListSchema = z.array(memberSchema);

export type Member = z.infer<typeof memberSchema>;
export type MemberResponse = BaseResponse<typeof memberSchema>;
export type MemberListResponse = BaseResponse<typeof memberListSchema>;

/**
 * 멤버 프로필에 있는 링크 스키마
 * @description Member link schema
 */
export const memberLinkSchema = z.object({
  id: z.string(),
  icon: z.string(),
  label: z.string(),
  href: z.string(),
});
export const memberLinkListSchema = z.array(memberLinkSchema);
// MemberLink Schema에 UUID를 제외한 스키마
export const memberLinkWithoutIDSchema = memberLinkSchema.omit({
  id: true,
})

export type MemberLink = z.infer<typeof memberLinkSchema>;
export type MemberLinkResponse = BaseResponse<typeof memberLinkSchema>;
export type MemberLinkListResponse = BaseResponse<typeof memberLinkListSchema>;
// MemberLink Schema에 UUID를 제외한 타입
export type MemberLinkWithoutID = z.infer<typeof memberLinkWithoutIDSchema>;
export type MemberLinkWithoutIDResponse = BaseResponse<typeof memberLinkWithoutIDSchema>;

/**
 * 멤버 스킬 스키마
 * @description Member skill schema
 */
export const memberSkillSchema = z.object({
  uuid: z.string(),
  isVerified: z.boolean(),
  isLearning: z.boolean(),
  skill: z.object({
    uuid: z.string(),
    icon: z.string(),
    name: z.string(),
    type: z.nativeEnum(MemberSkillEnum),
  }),
});
export const memberSkillListSchema = z.array(memberSkillSchema);
// MemberSkill Schema에 UUID를 제외한 스키마
export const memberSkillWithoutUUIDSchema = memberSkillSchema.omit({
  uuid: true,
})

export type MemberSkill = z.infer<typeof memberSkillSchema>;
export type MemberSkillResponse = BaseResponse<typeof memberSkillSchema>;
export type MemberSkillListResponse = BaseResponse<typeof memberSkillListSchema>;
// MemberSkill Schema에 UUID를 제외한 타입
export type MemberSkillWithoutUUID = z.infer<typeof memberSkillWithoutUUIDSchema>;
export type MemberSkillWithoutUUIDResponse = BaseResponse<typeof memberSkillWithoutUUIDSchema>;

/**
 * 멤버 History 스키마
 * @description Member history schema
 */
export const memberHistorySchema = z.object({
  id: z.number(),
  label: z.string(),
  link: z.string(),
  isImportant: z.boolean(),
  releasedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const memberHistoryListSchema = z.array(memberHistorySchema);
export const memberHistoryListWithoutIDSchema = memberHistorySchema.omit({
  id: true,
});

export type MemberHistory = z.infer<typeof memberHistorySchema>;
export type MemberHistoryResponse = BaseResponse<typeof memberHistorySchema>;
export type MemberHistoryListResponse = BaseResponse<typeof memberHistoryListSchema>;
// MemberHistory Schema에 ID를 제외한 타입
export type MemberHistoryListWithoutID = z.infer<typeof memberHistoryListWithoutIDSchema>;
export type MemberHistoryListWithoutIDResponse = BaseResponse<typeof memberHistoryListWithoutIDSchema>;


/**
 * 멤버 상세 스키마
 * @description Member detail schema
 */
export const memberDetailSchema = memberSchema.extend({
  isGraduated: z.boolean(),
  permissions: z.number(),
  links: memberLinkListSchema,
  awards: awardSchema.pick({
    uuid: true,
    competitionUUID: true,
    title: true,
    grade: true,
    gradeLabel: true,
    rewardedAt: true,
  }),
  skills: memberSkillListSchema,
  history: memberHistoryListSchema,
})
export const memberDetailListSchema = z.array(memberDetailSchema);

export type MemberDetail = z.infer<typeof memberDetailSchema>;
export type MemberDetailResponse = BaseResponse<typeof memberDetailSchema>;
export type MemberDetailListResponse = BaseResponse<typeof memberDetailListSchema>;