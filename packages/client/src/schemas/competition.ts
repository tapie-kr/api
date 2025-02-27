import { BaseResponse } from "@/schemas/base";
import { z } from "zod";
import { memberSchema } from "./member";

/**
 * Public 대회 수상 스키마
 * @description TAPIE WEB에서 사용되는 대회 수상 스키마
 */
export const publicAwardSchema = z.object({
  uuid: z.string().uuid(),
  fullTitle: z.string(),
  memberNames: z.array(z.string()),
});
export const publicAwardListSchema = z.array(publicAwardSchema);

export type PublicAward = z.infer<typeof publicAwardSchema>;
export type PublicAwardResponse = BaseResponse<typeof publicAwardSchema>;
export type PublicAwardListResponse = BaseResponse<
  typeof publicAwardListSchema
>;

/**
 * 대회 스키마
 * @description Competition schema
 */
export const competitionSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
});
export const competitionListSchema = z.array(competitionSchema);

export type Competition = z.infer<typeof competitionSchema>;
export type CompetitionResponse = BaseResponse<typeof competitionSchema>;
export type CompetitionListResponse = z.infer<typeof competitionListSchema>;

/**
 * 대회 수상 스키마
 * @description Award schema
 */
export const awardSchema = z.object({
  uuid: z.string().uuid(),
  competitionUUID: z.string().uuid(),
  title: z.string(),
  grade: z.number(),
  gradeLabel: z.string(),
  rewardedAt: z.string(),
  competition: competitionSchema,
  members: memberSchema.pick({
    uuid: true,
    name: true,
    studentID: true,
    username: true,
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export const awardListSchema = z.array(awardSchema);

export type Award = z.infer<typeof awardSchema>;
export type AwardResponse = BaseResponse<typeof awardSchema>;
export type AwardListResponse = BaseResponse<typeof awardListSchema>;

/**
 * 대회 수상 실적 추가 body 스키마
 * @description Create award schema
 */
export const createAwardSchema = z.object({
  title: z.string(),
  grade: z.number(),
  gradeLabel: z.string(),
  rewardedAt: z.string(),
  competition: competitionSchema.partial(),
  membersUUID: z.array(z.string()),
});
export type CreateAward = z.infer<typeof createAwardSchema>;

/**
 * 대회 수상 멤버 추가 body 스키마
 * @description Create award member schema
 */
export const addAwardMemberSchema = z.object({
  competition: competitionSchema.partial(),
  membersUUID: z.array(z.string()),
});
export type AddAwardMember = z.infer<typeof addAwardMemberSchema>;
