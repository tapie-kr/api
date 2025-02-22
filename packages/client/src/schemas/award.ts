import { z } from 'zod';
import { BaseResponse } from '@/schemas/base';

export const publicAwardSchema = z.object({
  uuid:        z.string().uuid(),
  fullTitle:   z.string(),
  memberNames: z.array(z.string()),
});

export const awardSchema = z.object({
  uuid:            z.string().uuid(),
  competitionUUID: z.string().uuid(),
  title:           z.string(),
  grade:           z.number(),
  gradeLabel:      z.string(),
  rewardedAt:      z.date(),
  createdAt:       z.date(),
  updatedAt:       z.date(),
  members:         z.object({
    uuid:     z.string().uuid(),
    name:     z.string(),
    username: z.string(),
  }),
});

export const addAwardSchema = z.object({
  title:       z.string(),
  grade:       z.number(),
  gradeLabel:  z.string(),
  rewardedAt:  z.string().datetime(),
  competition: z.object({
    uuid: z.string().uuid(),
    name: z.string(),
  }),
  membersUUID: z.array(z.string().uuid()),
});

export const competitionSchema = z.object({
  uuid:      z.string().uuid(),
  name:      z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const competitionAwardSchema = z.object({
  uuid:            z.string().uuid(),
  competitionUUID: z.string().uuid(),
  title:           z.string(),
  grade:           z.number(),
  gradeLabel:      z.string(),
  rewardedAt:      z.date(),
  createdAt:       z.date(),
  updatedAt:       z.date(),
  awards:          z.array(z.object({
    uuid:            z.string().uuid(),
    competitionUUID: z.string().uuid(),
    title:           z.string(),
    grade:           z.number(),
    gradeLabel:      z.string(),
    rewardedAt:      z.date(),
    createdAt:       z.date(),
    updatedAt:       z.date(),
  })),
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
