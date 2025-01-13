import { z } from 'astro:content';

export const GameControlsSchema = z.object({
  enabled: z.boolean().default(true),
  position: z.enum(['top', 'bottom', 'custom']).default('bottom'),
  theme: z.object({
    style: z.enum(['default', 'minimal', 'custom']).default('default'),
    background: z.string().optional(),
    foreground: z.string().optional(),
    opacity: z.number().min(0).max(1).default(0.9)
  }).optional(),
  items: z.object({
    fullscreen: z.boolean().default(true),
    sound: z.boolean().default(true),
    report: z.boolean().default(true),
    custom: z.array(z.object({
      id: z.string(),
      icon: z.string(),
      label: z.string().optional(),
      action: z.string(),
      tooltip: z.string().optional(),
      shortcut: z.string().optional(),
      visible: z.boolean().default(true)
    })).optional()
  })
});

export const GameEmbedSchema = z.object({
  iframeUrl: z.string().url(),
  fullscreenUrl: z.string().url(),
  thumbnail: z.string(),
  responsive: z.boolean().default(true),
  controls: GameControlsSchema,
  sandbox: z.array(
    z.enum([
      'allow-forms',
      'allow-scripts',
      'allow-same-origin',
      'allow-popups',
      'allow-modals',
      'allow-orientation-lock',
      'allow-pointer-lock',
      'allow-presentation'
    ])
  ).default(['allow-scripts', 'allow-same-origin']),
  loading: z.enum(['eager', 'lazy']).default('eager')
});

// Export types
export type GameControls = z.infer<typeof GameControlsSchema>;
export type GameEmbed = z.infer<typeof GameEmbedSchema>;