import { z } from 'astro:content';
import { PlatformSchema } from './base.schema';

export const GameReviewSchema = z.object({
  id: z.string(),
  user: z.object({
    name: z.string(),
    avatar: z.string().optional(),
    verified: z.boolean().optional()
  }),
  rating: z.number().min(0).max(5),
  content: z.string(),
  date: z.string(),
  likes: z.number().optional(),
  platform: PlatformSchema.optional(),
  playTime: z.string().optional()
});

export const GameSocialSchema = z.object({
  shareUrls: z.object({
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    whatsapp: z.string().url().optional()
  }),
  reviews: z.object({
    summary: z.object({
      average: z.number().min(0).max(5),
      total: z.number(),
      distribution: z.array(z.number()).length(5)
    }),
    featured: z.array(GameReviewSchema)
  })
});

// Export types
export type GameReview = z.infer<typeof GameReviewSchema>;
export type GameSocial = z.infer<typeof GameSocialSchema>;