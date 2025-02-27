import { MemberRole } from '@/constants/enum/member-role';
import { MemberUnit } from '@/constants/enum/unit-type';
import { BaseResponse } from '@/schemas/base';
import { z } from 'zod';

// Create Member
export const createMemberScheme = z.object({
  name: z.string(),
  username: z.string(),
  googleEmail: z.string(),
  role: z.nativeEnum(MemberRole),
  unit: z.nativeEnum(MemberUnit),
  generation: z.number(),
});
export type CreateMember = z.infer<typeof createMemberScheme>;

// Member Link
export const memberLinkSchema = z.object({
  icon: z.string(),
  label: z.string(),
  href: z.string(),
});
export type MemberLink = z.infer<typeof memberLinkSchema>;
export const memberLinkResponseSchema = z.object({
  id: z.number(),
  icon: z.string(),
  label: z.string(),
  href: z.string(),
});
export type MemberLinkResponse = BaseResponse<
  typeof memberLinkSchema & {
    uuid: string;
    profileUri: string;
  }
>;
export type MemberLinkType = z.infer<typeof memberLinkResponseSchema>;

// Member Awards
export const memberAwardsResponseSchema = z.object({
  uuid: z.string(),
  competitionUUID: z.string(),
  title: z.string(),
  grade: z.number(),
  gradeLabel: z.string(),
  rewardedAt: z.string(),
});
export type MemberAwardsType = z.infer<typeof memberAwardsResponseSchema>;

// Member Skill
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
export type MemberSkillRequest = z.infer<typeof memberSkillSchema>;
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
export type MemberSkillResponse = BaseResponse<
  typeof memberSkillResponseSchema
>;
export type MemberSkillType = z.infer<typeof memberSkillResponseSchema>;

// Member History
export const memberHistoryResponseSchema = z.object({
  id: z.number(),
  label: z.string(),
  link: z.string(),
  isImportant: z.boolean(),
  releasedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type MemberHistoryType = z.infer<typeof memberHistoryResponseSchema>;

// Member
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
export type MemberResponse = BaseResponse<typeof memberResponseSchema>;
export type MemberType = z.infer<typeof memberResponseSchema>;

// Member List
export const memberListResponseSchema = z.array(
  memberResponseSchema.omit({
    isGraduated: true,
    permissions: true,
    links: true,
    awards: true,
    skills: true,
    history: true,
  }),
);
export type MemberListResponse = BaseResponse<typeof memberListResponseSchema>;

// Search Member
export const searchMemberResponseSchema = z.object({
  uuid: z.string(),
  profileAssetUUID: z.string().optional(),
  representativePortfolioMemberUUID: z.string().optional(),
  representativeAwardUUID: z.string().optional(),
  formResponseUUID: z.string().optional(),
  username: z.string(),
  googleEmail: z.string(),
  role: z.nativeEnum(MemberRole),
  name: z.string(),
  studentID: z.number(),
  unit: z.nativeEnum(MemberUnit),
  generation: z.number(),
  permissions: z.number(),
  visitStats: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type SearchMemberResponse = BaseResponse<
  typeof searchMemberResponseSchema
>;
export type SearchMemberType = z.infer<typeof searchMemberResponseSchema>;

// Update Member
export const updateMemberSchema = memberResponseSchema.partial();
export type UpdateMember = z.infer<typeof updateMemberSchema>;

// Public Member List
export type PublicMemberListResponse = BaseResponse<
  typeof memberListResponseSchema
>;

// Update Member Link

export const updateMemberLinkSchema = memberLinkSchema.partial();
export type UpdateMemberLink = z.infer<typeof updateMemberLinkSchema>;

// Update Member Skill

export const updateMemberSkillSchema = memberSkillSchema.partial();
export type UpdateMemberSkill = z.infer<typeof updateMemberSkillSchema>;
