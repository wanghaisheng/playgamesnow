import { z } from 'astro:content';
import { CategorySchema, PlatformSchema, GamePreviewSchema } from '../base.schema';
import { SectionMetaBaseSchema, GridColumnsSchema } from './base.schema';
import {TagsSectionSchema} from  './browse.schema'


// Home Page Section Schemas
export const GameGridSectionSchema = z.object({
  id: z.string(),
  type: z.literal("gameGrid"),
  sectionMeta: SectionMetaBaseSchema.extend({
    columns: GridColumnsSchema.optional()
  }),
  filters: z.object({
    categories: z.array(CategorySchema),
    platforms: z.array(PlatformSchema),
    showFilters: z.boolean().optional(),
    showSort: z.boolean().optional(),
    defaultSort: z.enum(["rating", "downloads", "releaseDate", "title"]).optional(),
    defaultCategory: CategorySchema.optional()
  }).optional(),
  pagination: z.object({
    itemsPerPage: z.number(),
    showPagination: z.boolean()
  }).optional(),
  items: z.array(GamePreviewSchema)
});

export const GameRowSectionSchema = z.object({
  id: z.string(),
  type: z.literal("gameRow"),
  sectionMeta: SectionMetaBaseSchema.extend({
    layout: z.enum(['single', 'multiple']).default('single'),
    autoScroll: z.boolean().optional(),
    scrollInterval: z.number().optional(),
    rows: z.array(z.object({
      rowId: z.string(),
      title: z.string(),
      badge: z.string().optional(),
      viewMoreLink: z.string().optional(),
      autoScroll: z.boolean().optional(),
      scrollInterval: z.number().optional()
    })).optional()
  }),
  items: z.union([
    z.array(GamePreviewSchema),
    z.array(z.object({
      rowId: z.string(),
      games: z.array(GamePreviewSchema)
    }))
  ])
});

// 1. Game Category Landing Page Schema
export const GameCategoryLandingSchema = z.object({
  id: z.string(),
  type: z.literal('categoryLanding'),
  category: CategorySchema,
  meta: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    banner: z.string().optional(),
    featured: z.boolean().default(false)
  }),
  sections: z.array(z.union([
    GameGridSectionSchema,
    GameRowSectionSchema
  ])),
  filters: z.object({
    enabled: z.boolean().default(true),
    platforms: z.array(PlatformSchema),
    sorting: z.object({
      options: z.array(z.enum(['popular', 'newest', 'rating', 'name'])),
      default: z.string()
    }),
    tags: z.array(z.string()).optional()
  }).optional()
});

// 2. Game Search Schema
export const GameSearchSchema = z.object({
  id: z.string(),
  type: z.literal('search'),
  query: z.string(),
  filters: z.object({
    category: CategorySchema.optional(),
    platform: PlatformSchema.optional(),
    rating: z.number().optional(),
    tags: z.array(z.string()).optional(),
    sort: z.enum(['relevance', 'rating', 'newest', 'popular']).default('relevance')
  }),
  results: z.object({
    items: z.array(GamePreviewSchema),
    pagination: z.object({
      page: z.number(),
      totalPages: z.number(),
      totalResults: z.number(),
      itemsPerPage: z.number()
    }),
    suggestions: z.array(z.string()).optional()
  })
});

// 4. Game Collection Schema (for user collections/playlists)
export const GameCollectionSchema = z.object({
  id: z.string(),
  type: z.literal('collection'),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  visibility: z.enum(['public', 'private', 'unlisted']).default('public'),
  owner: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string().optional()
  }),
  games: z.array(GamePreviewSchema),
  meta: z.object({
    createdAt: z.string(),
    updatedAt: z.string(),
    gameCount: z.number(),
    views: z.number().optional(),
    followers: z.number().optional(),
    thumbnail: z.string().optional()
  })
});

// 5. Game Archive/Browse Schema
export const GameArchiveSchema = z.object({
  id: z.string(),
  type: z.literal('archive'),
  view: z.enum(['grid', 'list', 'compact']).default('grid'),
  filters: z.object({
    categories: z.array(CategorySchema),
    platforms: z.array(PlatformSchema),
    tags: z.array(z.string()),
    rating: z.object({
      min: z.number().min(0).max(5),
      max: z.number().min(0).max(5)
    }).optional(),
    sort: z.enum(['newest', 'popular', 'rating', 'name']).default('popular')
  }),
  pagination: z.object({
    page: z.number(),
    itemsPerPage: z.number(),
    totalPages: z.number(),
    totalItems: z.number()
  }),
  items: z.array(GamePreviewSchema)
});


// Hero Section Schema
export const GameHeroSectionSchema = z.object({
  id: z.string(),
  type: z.literal('hero'),
  layout: z.enum(['slider', 'grid', 'banner', 'featured']).default('slider'),
  autoplay: z.boolean().default(true),
  interval: z.number().default(5000),
  items: z.array(GamePreviewSchema.extend({
    subtitle: z.string().optional(),
    cta: z.object({
      text: z.string(),
      href: z.string(),
      variant: z.enum(['primary', 'secondary', 'outline']).default('primary')
    }).optional(),
    background: z.object({
      image: z.string(),
      video: z.string().optional(),
      overlay: z.boolean().default(true),
      position: z.enum(['center', 'top', 'bottom']).default('center')
    })
  })),
  display: z.object({
    showArrows: z.boolean().default(true),
    showDots: z.boolean().default(true),
    showProgress: z.boolean().default(false),
    aspectRatio: z.enum(['16:9', '21:9', 'full']).default('16:9'),
    overlay: z.object({
      gradient: z.boolean().default(true),
      opacity: z.number().min(0).max(1).default(0.5)
    }).optional()
  }).optional()
});

// Featured Games Section Schema
export const GameFeaturedSectionSchema = z.object({
  id: z.string(),
  type: z.literal('featured'),
  sectionMeta: SectionMetaBaseSchema.extend({
    layout: z.enum(['grid', 'carousel', 'showcase']).default('grid'),
    columns: GridColumnsSchema.optional()
  }),
  items: z.array(GamePreviewSchema.extend({
    highlight: z.string().optional(),
    badge: z.string().optional(),
    promotion: z.object({
      type: z.enum(['new', 'hot', 'sale', 'exclusive']),
      text: z.string().optional()
    }).optional()
  }))
});

// Popular Categories Section Schema
export const GameCategoriesSectionSchema = z.object({
  id: z.string(),
  type: z.literal('categories'),
  sectionMeta: SectionMetaBaseSchema,
  categories: z.array(z.object({
    category: CategorySchema,
    name: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    count: z.number().optional(),
    featured: z.boolean().default(false),
    href: z.string()
  })),
  display: z.object({
    layout: z.enum(['grid', 'list', 'carousel']).default('grid'),
    columns: GridColumnsSchema.optional(),
    showCount: z.boolean().default(true),
    showIcon: z.boolean().default(true),
    showImage: z.boolean().default(false)
  }).optional()
});

// Quick Access Section Schema
export const GameQuickAccessSectionSchema = z.object({
  id: z.string(),
  type: z.literal('quickAccess'),
  sectionMeta: SectionMetaBaseSchema,
  sections: z.array(z.object({
    id: z.string(),
    title: z.string(),
    icon: z.string().optional(),
    items: z.array(z.object({
      title: z.string(),
      href: z.string(),
      icon: z.string().optional(),
      badge: z.string().optional()
    }))
  })),
  display: z.object({
    columns: z.number().default(4),
    showIcons: z.boolean().default(true),
    variant: z.enum(['cards', 'list', 'minimal']).default('cards')
  }).optional()
});

// Enhanced Home Page Schema
export const GameHomePageSchema = z.object({
  id: z.string(),
  type: z.literal('homePage'),
  hero: GameHeroSectionSchema,
  sections: z.array(z.union([
    GameGridSectionSchema,
    GameRowSectionSchema,
    GameFeaturedSectionSchema,
    GameCategoriesSectionSchema,
    GameQuickAccessSectionSchema,
    TagsSectionSchema
  ])),
  sidebar: z.object({
    enabled: z.boolean().default(true),
    position: z.enum(['left', 'right']).default('right'),
    components: z.array(z.object({
      type: z.enum([
        'categories',
        'popularTags',
        'recentlyPlayed',
        'featured',
        'custom'
      ]),
      title: z.string(),
      data: z.any().optional(),
      display: z.object({
        collapsed: z.boolean().default(false),
        limit: z.number().optional(),
        showMore: z.boolean().default(false)
      }).optional()
    }))
  }).optional(),
  display: z.object({
    layout: z.enum(['standard', 'compact', 'featured']).default('standard'),
    maxWidth: z.enum(['default', 'wide', 'full']).default('default'),
    spacing: z.enum(['default', 'compact', 'comfortable']).default('default')
  }).optional()
});



// Export new types
export type GameCategoryLanding = z.infer<typeof GameCategoryLandingSchema>;
export type GameSearch = z.infer<typeof GameSearchSchema>;
export type GameHomePage = z.infer<typeof GameHomePageSchema>;
export type GameCollection = z.infer<typeof GameCollectionSchema>;
export type GameArchive = z.infer<typeof GameArchiveSchema>;
// Export types
export type GameGridSection = z.infer<typeof GameGridSectionSchema>;
export type GameRowSection = z.infer<typeof GameRowSectionSchema>;
export type GameCategoriesSection = z.infer<typeof GameCategoriesSectionSchema>;
export type GameQuickAccessSection = z.infer<typeof GameQuickAccessSectionSchema>;

export type GameHeroSection = z.infer<typeof GameHeroSectionSchema>;
export type GameFeaturedSection = z.infer<typeof GameFeaturedSectionSchema>;


// Add this at the end of the file
export const homeSectionSchemas = {
  hero: GameHeroSectionSchema,
  grid: GameGridSectionSchema,
  row: GameRowSectionSchema,
  featured: GameFeaturedSectionSchema,
  categories: GameCategoriesSectionSchema,
  quickAccess: GameQuickAccessSectionSchema
};

// Combined home section type
export type GameHomeSection =
  | GameHeroSection
  | GameGridSection
  | GameRowSection
  | GameFeaturedSection
  | GameCategoriesSection
  | GameQuickAccessSection;