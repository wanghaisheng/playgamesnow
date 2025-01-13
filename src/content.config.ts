import { defineCollection } from 'astro:content';
import { z } from 'astro:content';
import { glob } from 'astro/loaders';

// Import schemas
import { GameDetailSchema } from './schemas/sections/detail.schema';
import { saasSchemas } from './schemas/saas.schema';
import { 
  GameGridSectionSchema,
  GameRowSectionSchema,
  GameHeroSectionSchema,
  GameCategoriesSectionSchema,
  GameCollectionSchema,GameQuickAccessSectionSchema
} from './schemas/sections';

// Main Games Collection - Single source of truth
const games = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/games" }),
  schema: GameDetailSchema
});

// Section layouts/configurations
const sections = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/sections" }),
  schema: z.discriminatedUnion('type', [
    // Game sections
    GameHeroSectionSchema,        // Hero/Featured games
    GameGridSectionSchema,        // Grid layout
    GameRowSectionSchema,         // Row layout with categories
    GameCategoriesSectionSchema,  // Categories/Tags browse
    GameCollectionSchema,         // Curated collections
    GameQuickAccessSectionSchema,
    // Marketing/SaaS sections
    saasSchemas.hero,
    saasSchemas.features,
    saasSchemas.pricing,
    saasSchemas.testimonial,
    saasSchemas.faq,
    saasSchemas.cta
  ])
});

// Blog Collection
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/data/content/blog" }),
  schema: saasSchemas.blog
});

// Export collections
export const collections = {
  games,    // All game data
  sections, // Section layouts
  blog      // Blog posts
};

// Re-export schemas for use in other files
export * from './schemas/sections';
export * from './schemas/saas.schema';

/*
Example directory structure:
src/
├── data/
│   ├── json/
│   │   ├── games/              # Complete game data
│   │   │   ├── bloxd.json
│   │   │   └── minecraft.json
│   │   └── sections/           # Section configurations
│   │       ├── home/          
│   │       │   ├── hero.json
│   │       │   ├── trending.json
│   │       │   └── categories.json
│   │       ├── collections/
│   │       │   ├── best-2024.json
│   │       │   └── editors-choice.json
│   │       └── browse/
│   │           ├── all-tags.json
│   │           └── categories.json
│   └── content/
│       └── blog/               # Blog posts
*/