import { BaseResponse } from '@/schemas/base';
import { z } from 'zod';

export const publicAwardSchema = z.object({
  uuid: z.string().uuid(),
  fullTitle: z.string(),
  memberNames: z.array(z.string()),
});

export const awardSchema = z.object({
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
});

export const addAwardSchema = z.object({
  title: z.string(),
  grade: z.number(),
  gradeLabel: z.string(),
  rewardedAt: z.string().datetime(),
  competition: z.object({
    uuid: z.string().uuid(),
    name: z.string(),
  }),
  membersUUID: z.array(z.string().uuid()),
});

export const competitionSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const competitionAwardSchema = z.object({
  uuid: z.string().uuid(),
  competitionUUID: z.string().uuid(),
  title: z.string(),
  grade: z.number(),
  gradeLabel: z.string(),
  rewardedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  awards: z.array(
    z.object({
      uuid: z.string().uuid(),
      competitionUUID: z.string().uuid(),
      title: z.string(),
      grade: z.number(),
      gradeLabel: z.string(),
      rewardedAt: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
});

export const publicAwardListResponseSchema = z.array(publicAwardSchema);

export type PublicAwardListResponse = BaseResponse<
  typeof publicAwardListResponseSchema
>;

export const awardListResponseSchema = z.array(awardSchema);
export type AwardListResponse = BaseResponse<typeof awardListResponseSchema>;
export type CreateAward = z.infer<typeof addAwardSchema>;
export type CreateAwardWithoutUUID = Omit<CreateAward, 'uuid'>;

export type CreateAwardMember = Pick<
  CreateAward,
  'competition' | 'membersUUID'
>;

export const competitionListResponseSchema = z.array(competitionSchema);

export type CompetitionListResponse = BaseResponse<
  typeof competitionListResponseSchema
>;

export type CompetitionAwardListResponseSchema = BaseResponse<
  typeof competitionAwardSchema
>;

export type AwardType = z.infer<typeof awardSchema>;
export type CompetitionType = z.infer<typeof competitionSchema>;
export type CompetitionAwardType = z.infer<typeof competitionAwardSchema>;

// New exports for frontend props types
export type PublicAwardSchemaProps = z.infer<typeof publicAwardSchema>;
export type AwardSchemaProps = z.infer<typeof awardSchema>;
export type AddAwardSchemaProps = z.infer<typeof addAwardSchema>;
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

// New exports for frontend types (using "Data" suffix or similar)
export type PublicAwardData = z.infer<typeof publicAwardSchema>;
export type AwardData = z.infer<typeof awardSchema>;
export type AddAwardData = z.infer<typeof addAwardSchema>;
export type CompetitionData = z.infer<typeof competitionSchema>;
export type CompetitionAwardData = z.infer<typeof competitionAwardSchema>;
export type PublicAwardListData = z.infer<typeof publicAwardListResponseSchema>;
export type AwardListData = z.infer<typeof awardListResponseSchema>;
