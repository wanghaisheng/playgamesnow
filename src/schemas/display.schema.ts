import { z } from 'astro:content';

export const GameDisplaySchema = z.object({
  sections: z.array(
    z.enum([
      'hero',
      'info',
      'features',
      'media',
      'howToPlay',
      'reviews',
      'similar'
    ])
  ),
  layout: z.object({
    sidebar: z.enum(['left', 'right']).default('right'),
    similarGames: z.object({
      position: z.enum(['bottom', 'sidebar']).default('bottom'),
      limit: z.number().default(4)
    })
  })
});

// Export type
export type GameDisplay = z.infer<typeof GameDisplaySchema>;