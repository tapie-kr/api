import { z } from "zod"
import { BaseResponse } from '@/schemas/base';

export const portfolioSchema = z.object({
  uuid: z.string().uuid(),
  name: z.string(),
  catchPhrase: z.string(),
  description: z.string(),
  tags: z.array(z.string()),
  thumbnailEffectColor: z.string(),
  releasedAt: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  representativeThumbnailUrl: z.string().url(),
  thumbnailUrls: z.array(z.string().url()),
  isAwarded: z.boolean()
});

export type PortfolioType = z.infer<typeof portfolioSchema>;
export type PortfolioResponse = BaseResponse<typeof portfolioSchema>;

// Portfolio List
export const portfolioListSchema = z.array(portfolioSchema);
export type PortfolioListType = z.infer<typeof portfolioListSchema>;
export type PortfolioListResponse = BaseResponse<typeof portfolioListSchema>;