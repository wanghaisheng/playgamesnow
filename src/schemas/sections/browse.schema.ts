import { z } from 'astro:content';
import { GamePreviewSchema } from '../base.schema';
import { SectionMetaBaseSchema, GridColumnsSchema } from './base.schema';

export const TagsSectionSchema = z.object({
  id: z.string(),
  type: z.literal("tagsSection"),
  sectionMeta: SectionMetaBaseSchema.extend({
    viewType: z.enum(['tags', 'categories']),
    showCount: z.boolean().default(true),
    columns: GridColumnsSchema.optional()
  }),
  groups: z.array(z.object({
    letter: z.string(),
    tags: z.array(z.object({
      name: z.string(),
      count: z.number(),
      href: z.string()
    }))
  }))
});

export const AZSectionSchema = z.object({
  id: z.string(),
  type: z.literal("azSection"),
  sectionMeta: SectionMetaBaseSchema.extend({
    viewType: z.enum(['games', 'tags', 'categories']),
    showCount: z.boolean().default(true),
    columns: GridColumnsSchema.optional()
  }),
  groups: z.array(z.object({
    letter: z.string(),
    items: z.union([
      z.array(GamePreviewSchema),
      z.array(z.object({
        name: z.string(),
        slug: z.string(),
        count: z.number(),
        href: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        featured: z.boolean().optional()
      }))
    ])
  })),
  display: z.object({
    showEmptyGroups: z.boolean().default(false),
    showGroupHeaders: z.boolean().default(true),
    layout: z.enum(['grid', 'list']).default('grid'),
    sorting: z.object({
      type: z.enum(['alphabetical', 'count', 'popular']).default('alphabetical'),
      direction: z.enum(['asc', 'desc']).default('asc')
    }).optional(),
    pagination: z.object({
      enabled: z.boolean().default(false),
      itemsPerPage: z.number().optional(),
      showPagination: z.boolean().optional()
    }).optional()
  }).optional()
});

// Export types
export type TagsSection = z.infer<typeof TagsSectionSchema>;
export type AZSection = z.infer<typeof AZSectionSchema>;