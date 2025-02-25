import { z } from 'zod';
import { MemberRole } from '@/constants/enum/member-role';
import { MemberUnitType } from '@/constants/enum/unit-type';
import { BaseResponse } from '@/schemas/base';

export const memberSchema = z.object({
  uuid:        z.string(),
  name:        z.string(),
  username:    z.string(),
  role:        z.nativeEnum(MemberRole),
  unit:        z.nativeEnum(MemberUnitType),
  generation:  z.number(),
  googleEmail: z.string(),
  profileUrl:  z.string(),
});

export const createMemberScheme = z.object({
  name:        z.string(),
  username:    z.string(),
  googleEmail: z.string(),
  role:        z.nativeEnum(MemberRole),
  unit:        z.nativeEnum(MemberUnitType),
  generation:  z.number(),
});

export const memberLinkSchema = z.object({
  icon:  z.string(),
  label: z.string(),
  href:  z.string(),
});

export const memberSkillSchema = z.object({
  isVerified: z.boolean(),
  isLearning: z.boolean(),
  skill:      z.object({
    uuid: z.string(),
    icon: z.string(),
    name: z.string(),
    type: z.nativeEnum(MemberUnitType),
  }),
});

export const memberSkillResponseSchema = z.object({
  isVerified: z.boolean(),
  isLearning: z.boolean(),
  skill:      z.object({
    uuid:      z.string(),
    icon:      z.string(),
    name:      z.string(),
    type:      z.nativeEnum(MemberUnitType),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
});

export const memberListResponseSchema = z.array(memberSchema);

export type PublicMemberListResponse = BaseResponse<
  typeof memberListResponseSchema
>;

export type MemberResponse = BaseResponse<typeof memberSchema>;
export type MemberListResponse = BaseResponse<typeof memberListResponseSchema>;
export type CreateMember = z.infer<typeof createMemberScheme>;
export const updateMemberSchema = memberSchema.partial();
export type UpdateMember = z.infer<typeof updateMemberSchema>;
export type MemberLink = z.infer<typeof memberLinkSchema>;

export type MemberLinkResponse = BaseResponse<
  typeof memberLinkSchema & {
    uuid:       string;
    profileUrl: string;
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

export type MemberType = z.infer<typeof memberSchema>;
export type MemberLinkType = z.infer<typeof memberLinkSchema>;
export type MemberSkillType = z.infer<typeof memberSkillSchema>;
