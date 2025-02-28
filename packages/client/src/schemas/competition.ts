import { BaseResponse } from '@/schemas/base';
import { z } from 'zod';

// Competition
export const competitionSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type CompetitionResponse = BaseResponse<typeof competitionSchema>;
export type CompetitionType = z.infer<typeof competitionSchema>;

// Competition List
export const competitionListResponseSchema = z.array(competitionSchema);
export type CompetitionListResponse = BaseResponse<
  typeof competitionListResponseSchema
>;
export type CompetitionListType = z.infer<typeof competitionListResponseSchema>;

// Portfolio Award
export const awardResponseSchema = z.object({
  uuid: z.string().uuid(),
  competitionUUID: z.string().uuid(),
  title: z.string(),
  grade: z.number(),
  gradeLabel: z.string(),
  rewardedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  members: z.array(
    z.object({
      uuid: z.string().uuid(),
      name: z.string(),
      username: z.string(),
    }),
  ),
  competition: competitionSchema,
});
export type AwardType = z.infer<typeof awardResponseSchema>;

// Portfolio Award List
export const awardListResponseSchema = z.array(awardResponseSchema);
export type AwardListResponse = BaseResponse<typeof awardListResponseSchema>;
export type AwardListType = z.infer<typeof awardListResponseSchema>;

// Create Portfolio Award
export const createAwardSchema = z.object({
  title: z.string(),
  grade: z.number(),
  gradeLabel: z.string(),
  rewardedAt: z.string(),
  competition: z.object({
    uuid: z.string().optional(),
    name: z.string().optional(),
  }),
  membersUUID: z.array(z.string()),
});
export type CreateAwardRequest = z.infer<typeof createAwardSchema>;
export const createAwardResponseSchema = z.object({
  uuid: z.string(),
  competitionUUID: z.string(),
  title: z.string(),
  grade: z.number(),
  gradeLabel: z.string(),
  rewardedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type CreateAwardResponse = BaseResponse<
  typeof createAwardResponseSchema
>;
export type CreateAwardType = z.infer<typeof createAwardResponseSchema>;

// Add Award Member
export const addAwardMemberSchema = createAwardSchema.pick({
  competition: true,
  membersUUID: true,
});
export type AddAwardMemberRequest = z.infer<typeof addAwardMemberSchema>;

// Competition Award List
export const competitionAwardSchema = z.object({
  uuid: z.string().uuid(),
  competitionUUID: z.string().uuid(),
  title: z.string(),
  grade: z.number(),
  gradeLabel: z.string(),
  rewardedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  awards: z.array(createAwardResponseSchema),
});
export type CompetitionAwardResponse = BaseResponse<
  typeof competitionAwardSchema
>;
export type CompetitionAwardType = z.infer<typeof competitionAwardSchema>;
export const competitionAwardListResponseSchema = z.array(
  competitionAwardSchema,
);
export type CompetitionAwardListResponse = BaseResponse<
  typeof competitionAwardListResponseSchema
>;
export type CompetitionAwardListType = z.infer<
  typeof competitionAwardListResponseSchema
>;

// Award (Public)
export const publicAwardSchema = z.object({
  uuid: z.string().uuid(),
  fullTitle: z.string(),
  memberNames: z.array(z.string()),
});
export type PublicAwardResponse = BaseResponse<typeof publicAwardSchema>;
export type PublicAwardType = z.infer<typeof publicAwardSchema>;

// Award List (Public)
export const publicAwardListResponseSchema = z.array(publicAwardSchema);
export type PublicAwardListResponse = BaseResponse<
  typeof publicAwardListResponseSchema
>;
export type PublicAwardListType = z.infer<typeof publicAwardListResponseSchema>;

// New exports for frontend props types
export type AwardSchemaProps = z.infer<typeof awardResponseSchema>;
export type CompetitionSchemaProps = z.infer<typeof competitionSchema>;
export type CompetitionAwardSchemaProps = z.infer<
  typeof competitionAwardSchema
>;
export type PublicAwardListResponseSchemaProps = z.infer<
  typeof publicAwardListResponseSchema
>;
export type AwardListResponseSchemaProps = z.infer<
  typeof awardListResponseSchema
>;