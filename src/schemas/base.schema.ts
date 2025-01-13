import { z } from 'astro:content';

// Base Game Enums and Types
export const PlatformSchema = z.enum(["android", "ios", "web", "pc", "console"]);
export const CategorySchema = z.enum([
  "All", "Adventure", "Racing", "Puzzle", "Simulation", 
  "Strategy", "Sports", "Action", "RPG", "Casual"
]);

// Base Schema
export const GameBaseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  image: z.string(),
  href: z.string(),
  platforms: z.array(PlatformSchema),
  rating: z.number().min(0).max(5),
  category: CategorySchema,
  featured: z.boolean().default(false),
  meta: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    ogImage: z.string().optional(),
    embedConfig: z.object({
      defaultControls: z.boolean().default(true),
      autoplay: z.boolean().default(false),
      preload: z.enum(['auto', 'metadata', 'none']).default('auto'),
      aspectRatio: z.enum(['16:9', '4:3', 'square']).default('16:9'),
      placeholder: z.string().optional()
    }).optional()
  }),
  status: z.enum(['published', 'beta', 'maintenance', 'private']).default('published'),
  access: z.object({
    requireAuth: z.boolean().default(false),
    minimumAge: z.number().optional(),
    restrictions: z.array(z.string()).optional()
  }).optional()
});

export const GamePreviewSchema = GameBaseSchema.extend({
  badge: z.string().optional(),
  playCount: z.number().optional(),
  isNew: z.boolean().optional(),
  isFeatured: z.boolean().optional(),
  shortDescription: z.string().optional()
});


// Export types
export type Platform = z.infer<typeof PlatformSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type GameBase = z.infer<typeof GameBaseSchema>;
export type GamePreview = z.infer<typeof GamePreviewSchema>;