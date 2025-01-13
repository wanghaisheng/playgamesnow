import { z } from 'astro:content';

// Player Controls Schema
export const GamePlayerControlsSchema = z.object({
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
  }),
  keyboard: z.object({
    enabled: z.boolean().default(true),
    shortcuts: z.record(z.string(), z.string()).optional(),
    preventDefault: z.boolean().default(true)
  }).optional()
});

// Player State Schema
export const GamePlayerStateSchema = z.object({
  loading: z.object({
    showSpinner: z.boolean().default(true),
    spinnerColor: z.string().optional(),
    customSpinner: z.string().optional(),
    loadingText: z.string().optional()
  }).optional(),
  error: z.object({
    showError: z.boolean().default(true),
    retryAttempts: z.number().default(3),
    retryDelay: z.number().default(1000),
    fallbackImage: z.string().optional(),
    customError: z.object({
      title: z.string(),
      message: z.string(),
      action: z.string()
    }).optional()
  }).optional(),
  overlay: z.object({
    enabled: z.boolean().default(false),
    content: z.string().optional(),
    position: z.enum(['top', 'center', 'bottom']).default('center'),
    dismissable: z.boolean().default(true)
  }).optional()
});

// Export types
export type GamePlayerControls = z.infer<typeof GamePlayerControlsSchema>;
export type GamePlayerState = z.infer<typeof GamePlayerStateSchema>;