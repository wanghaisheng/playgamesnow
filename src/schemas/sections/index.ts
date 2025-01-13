// Import base schemas and types
import { SectionMetaBaseSchema, GridColumnsSchema } from './base.schema';
import type { SectionMetaBase, GridColumns } from './base.schema';

// Import home schemas and types
import {
  GameHeroSectionSchema,
  GameGridSectionSchema,
  GameRowSectionSchema,
  GameFeaturedSectionSchema,
  GameCategoriesSectionSchema,
  GameQuickAccessSectionSchema,
  GameHomePageSchema,
  type GameHeroSection,
  type GameGridSection,
  type GameRowSection,
  type GameFeaturedSection,
  type GameCategoriesSection,
  type GameQuickAccessSection,
  type GameHomeSection,
  type GameHomePage
} from './home.schema';

// Import browse schemas and types
import {
  TagsSectionSchema,
  AZSectionSchema,
  type TagsSection,
  type AZSection
} from './browse.schema';

// Import detail schemas and types
import {
  GameDetailHeroSchema,
  GameDetailInfoSchema,
  GameDetailMediaSchema,
  GameDetailFeaturesSchema,
  GameDetailReviewsSchema,
  GameDetailSimilarSchema,
  GameDetailRequirementsSchema,
  GameDetailHowToPlaySchema,
  type GameDetailHero,
  type GameDetailInfo,
  type GameDetailMedia,
  type GameDetailFeatures,
  type GameDetailReviews,
  type GameDetailSimilar,
  type GameDetailRequirements,
  type GameDetailHowToPlay,
  type GameDetailSection
} from './detail.schema';

// Import additional schemas
import {
  GameSearchSchema,
  GameArchiveSchema,
  GameCollectionSchema,
  GameCategoryLandingSchema,
  type GameSearch,
  type GameArchive,
  type GameCollection,
  type GameCategoryLanding
} from './home.schema';

// Re-export everything from the source files
export * from './base.schema';
export * from './home.schema';
export * from './browse.schema';
export * from './detail.schema';

// Combined section types
export type GameSection = 
  | GameHomeSection    // From home.schema.ts
  | TagsSection       // From browse.schema.ts
  | AZSection         // From browse.schema.ts
  | GameDetailSection; // From detail.schema.ts

// Export section schemas grouped by type
export const sectionSchemas = {
  // Home page sections
  home: {
    hero: GameHeroSectionSchema,
    grid: GameGridSectionSchema,
    row: GameRowSectionSchema,
    featured: GameFeaturedSectionSchema,
    categories: GameCategoriesSectionSchema,
    quickAccess: GameQuickAccessSectionSchema
  },
  
  // Browse/Discovery sections
  browse: {
    az: AZSectionSchema,
    tags: TagsSectionSchema,
    search: GameSearchSchema,
    archive: GameArchiveSchema,
    collection: GameCollectionSchema,
    categoryLanding: GameCategoryLandingSchema
  },
  
  // Detail page sections
  detail: {
    hero: GameDetailHeroSchema,
    info: GameDetailInfoSchema,
    media: GameDetailMediaSchema,
    features: GameDetailFeaturesSchema,
    reviews: GameDetailReviewsSchema,
    similar: GameDetailSimilarSchema,
    requirements: GameDetailRequirementsSchema,
    howToPlay: GameDetailHowToPlaySchema
  }
};

// Page-level schemas
export const pageSchemas = {
  home: GameHomePageSchema,
  categoryLanding: GameCategoryLandingSchema,
  collection: GameCollectionSchema,
  archive: GameArchiveSchema,
  search: GameSearchSchema
};

// Helper type for page schemas
export type GamePage = 
  | GameHomePage
  | GameCategoryLanding
  | GameCollection
  | GameArchive
  | GameSearch;

// Re-export common types
export type {
  // Base types
  SectionMetaBase,
  GridColumns,
  
  // Home section types
  GameHeroSection,
  GameGridSection,
  GameRowSection,
  GameFeaturedSection,
  GameCategoriesSection,
  GameQuickAccessSection,
  GameHomeSection,
  
  // Browse section types
  TagsSection,
  AZSection,
  
  // Detail section types
  GameDetailHero,
  GameDetailInfo,
  GameDetailMedia,
  GameDetailFeatures,
  GameDetailReviews,
  GameDetailSimilar,
  GameDetailRequirements,
  GameDetailHowToPlay,
  GameDetailSection,
  
  // Page types
  GameHomePage,
  GameCategoryLanding,
  GameCollection,
  GameArchive,
  GameSearch
};