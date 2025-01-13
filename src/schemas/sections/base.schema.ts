import { z } from 'astro:content';

// Common Section Meta Schemas
export const SectionMetaBaseSchema = z.object({
  sectionTitle: z.string().optional(),
  sectionHeading: z.string().optional(),
  sectionDescription: z.string().optional(),
  viewMoreLink: z.string().optional(),
  badge: z.string().optional()
});

export const GridColumnsSchema = z.object({
  sm: z.number(),
  md: z.number(),
  lg: z.number(),
  xl: z.number()
});

// Export types
export type SectionMetaBase = z.infer<typeof SectionMetaBaseSchema>;
export type GridColumns = z.infer<typeof GridColumnsSchema>;