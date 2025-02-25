import { MemberRole } from '@/constants/enum/member-role';
import { MemberUnit } from '@/constants/enum/unit-type';
import { BaseResponse } from '@/schemas/base';
import { z } from 'zod';

export const createMemberScheme = z.object({
  name: z.string(),
  username: z.string(),
  googleEmail: z.string(),
  role: z.nativeEnum(MemberRole),
  unit: z.nativeEnum(MemberUnit),
  generation: z.number(),
});

export const memberLinkSchema = z.object({
  icon: z.string(),
  label: z.string(),
  href: z.string(),
});

export const memberLinkResponseSchema = z.object({
  id: z.number(),
  icon: z.string(),
  label: z.string(),
  href: z.string(),
});

export const memberAwardsResponseSchema = z.object({
  uuid: z.string(),
  competitionUUID: z.string(),
  title: z.string(),
  grade: z.number(),
  gradeLabel: z.string(),
  rewardedAt: z.string(),
});

export const memberSkillSchema = z.object({
  isVerified: z.boolean(),
  isLearning: z.boolean(),
  skill: z.object({
    uuid: z.string(),
    icon: z.string(),
    name: z.string(),
    type: z.nativeEnum(MemberUnit),
  }),
});

export const memberSkillResponseSchema = z.object({
  uuid: z.string(),
  isVerified: z.boolean(),
  isLearning: z.boolean(),
  skill: z.object({
    uuid: z.string(),
    icon: z.string(),
    name: z.string(),
    type: z.nativeEnum(MemberUnit),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const memberHistoryResponseSchema = z.object({
  id: z.number(),
  label: z.string(),
  link: z.string(),
  isImportant: z.boolean(),
  releasedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const memberResponseSchema = z.object({
  uuid: z.string(),
  name: z.string(),
  studentID: z.number(),
  username: z.string(),
  googleEmail: z.string(),
  role: z.nativeEnum(MemberRole),
  unit: z.nativeEnum(MemberUnit),
  generation: z.number(),
  profileUri: z.string(),
  isGraduated: z.boolean(),
  permissions: z.number(),
  links: z.array(memberLinkResponseSchema),
  awards: z.array(memberAwardsResponseSchema),
  skills: z.array(memberSkillResponseSchema),
  history: z.array(memberHistoryResponseSchema),
});

export const memberListResponseSchema = z.array(memberResponseSchema);

export type PublicMemberListResponse = BaseResponse<
  typeof memberListResponseSchema
>;

export type MemberResponse = BaseResponse<typeof memberResponseSchema>;
export type MemberListResponse = BaseResponse<typeof memberListResponseSchema>;
export type CreateMember = z.infer<typeof createMemberScheme>;
export const updateMemberSchema = memberResponseSchema.partial();
export type UpdateMember = z.infer<typeof updateMemberSchema>;
export type MemberLink = z.infer<typeof memberLinkSchema>;

export type MemberLinkResponse = BaseResponse<
  typeof memberLinkSchema & {
    uuid: string;
    profileUri: string;
  }
>;

export const updateMemberLinkSchema = memberLinkSchema.partial();
export type UpdateMemberLink = z.infer<typeof updateMemberLinkSchema>;
export type MemberSkillRequest = z.infer<typeof memberSkillSchema>;

export type MemberSkillResponse = BaseResponse<
  typeof memberSkillResponseSchema
>;

export const updateMemberSkillSchema = memberSkillSchema.partial();
export type UpdateMemberSkill = z.infer<typeof updateMemberSkillSchema>;

export type MemberType = z.infer<typeof memberResponseSchema>;
export type MemberLinkType = z.infer<typeof memberLinkResponseSchema>;
export type MemberAwardsType = z.infer<typeof memberAwardsResponseSchema>;
export type MemberSkillType = z.infer<typeof memberSkillResponseSchema>;
export type MemberHistoryType = z.infer<typeof memberHistoryResponseSchema>;
