# Game Components Implementation Plan

## Current Components in Schema
1. ✅ Game Base & Preview
2. ✅ Game Grid/List
3. ✅ Game Rows
4. ✅ Tags/Categories Browse
5. ✅ Game Collections
6. ✅ Game Hero
7. ✅ Game Detail Sections

## Missing Components

### 1. Search Components
- [ ] SearchBar schema
- [ ] SearchResults schema
- [ ] SearchFilters schema
- [ ] Recent Searches
- [ ] Search Suggestions

### 2. User Interaction Components
- [ ] GameRating schema
- [ ] GameComment schema
- [ ] GameFavorite schema
- [ ] GameShare schema
- [ ] GameReport schema

### 3. Game Progress Components
- [ ] GameAchievements schema
- [ ] GameLeaderboard schema
- [ ] GameProgress schema
- [ ] GameStats schema
- [ ] GameHistory schema

### 4. Social Components
- [ ] GameCommunity schema
- [ ] GameChat schema
- [ ] GameFriends schema
- [ ] GameMultiplayer schema
- [ ] GameInvite schema

### 5. Game Support Components
- [ ] GameHelp schema
- [ ] GameFAQ schema
- [ ] GameTutorial schema
- [ ] GameTips schema
- [ ] GameBugReport schema

### 6. Monetization Components
- [ ] GameStore schema
- [ ] GamePurchase schema
- [ ] GameSubscription schema
- [ ] GameRewards schema
- [ ] GameCurrency schema

### 7. Game Management Components
- [ ] GameSettings schema
- [ ] GameSave schema
- [ ] GameControls schema
- [ ] GamePreferences schema
- [ ] GameNotifications schema

## Priority Implementation Order

### Phase 1: Core User Interaction
1. SearchBar & Results
2. GameRating & Comments
3. GameFavorite & Share
4. GameReport

### Phase 2: Player Progress
1. GameAchievements
2. GameLeaderboard
3. GameProgress
4. GameStats

### Phase 3: Social Features
1. GameCommunity
2. GameChat
3. GameFriends
4. GameMultiplayer

### Phase 4: Support & Monetization
1. GameHelp & FAQ
2. GameStore
3. GamePurchase
4. GameRewards

### Phase 5: Management & Settings
1. GameSettings
2. GameSave
3. GameControls
4. GameNotifications

## Let's start with SearchBar schema:

```typescript:src/schemas/search.schema.ts
import { z } from 'astro:content';
import { PlatformSchema, CategorySchema } from './game.schema';

// Search Related Schemas
export const SearchFiltersSchema = z.object({
  categories: z.array(CategorySchema).optional(),
  platforms: z.array(PlatformSchema).optional(),
  rating: z.object({
    min: z.number().min(0).max(5).optional(),
    max: z.number().min(0).max(5).optional()
  }).optional(),
  tags: z.array(z.string()).optional(),
  sort: z.enum(['relevance', 'rating', 'newest', 'popular']).optional()
});

export const SearchSuggestionSchema = z.object({
  type: z.enum(['game', 'category', 'tag', 'collection']),
  text: z.string(),
  href: z.string(),
  icon: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.string().optional()
});

export const SearchResultSchema = z.object({
  id: z.string(),
  type: z.literal('searchResult'),
  query: z.string(),
  filters: SearchFiltersSchema.optional(),
  suggestions: z.array(SearchSuggestionSchema).optional(),
  recentSearches: z.array(z.string()).optional(),
  popularSearches: z.array(z.string()).optional(),
  results: z.object({
    total: z.number(),
    page: z.number(),
    perPage: z.number(),
    items: z.array(z.object({
      type: z.enum(['game', 'category', 'tag', 'collection']),
      title: z.string(),
      description: z.string().optional(),
      href: z.string(),
      thumbnail: z.string().optional(),
      highlights: z.array(z.object({
        field: z.string(),
        snippet: z.string()
      })).optional(),
      metadata: z.record(z.string(), z.any()).optional()
    }))
  })
});

// Export all search schemas
export const searchSchemas = {
  filters: SearchFiltersSchema,
  suggestion: SearchSuggestionSchema,
  result: SearchResultSchema
};

// Export types
export type SearchFilters = z.infer<typeof SearchFiltersSchema>;
export type SearchSuggestion = z.infer<typeof SearchSuggestionSchema>;
export type SearchResult = z.infer<typeof SearchResultSchema>;