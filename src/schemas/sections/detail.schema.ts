import { z } from 'astro:content';
import { PlatformSchema, GamePreviewSchema } from '../base.schema';
import { GamePlayerControlsSchema, GamePlayerStateSchema } from '../player.schema';



// First, define the complete game detail schema
export const GameDetailSchema = z.object({
  // Base game info
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  image: z.string(),
  href: z.string(),
  platforms: z.array(PlatformSchema),
  rating: z.number().min(0).max(5),
  category: z.enum([
    "All", "Adventure", "Racing", "Puzzle", "Simulation", 
    "Strategy", "Sports", "Action", "RPG", "Casual"
  ]),
  featured: z.boolean().default(false),

  // Meta information
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

  // Hero/Embed section
  embed: z.object({
    iframeUrl: z.string(),
    fullscreenUrl: z.string(),
    thumbnail: z.string(),
    responsive: z.boolean().default(true),
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
    loading: z.enum(['eager', 'lazy']).default('eager'),
    communication: z.object({
      enabled: z.boolean().default(false),
      targetOrigin: z.string().optional(),
      events: z.array(z.string()).optional(),
      methods: z.array(z.string()).optional()
    }).optional()
  }),

  // Quick stats
  stats: z.object({
    rating: z.number(),
    plays: z.number(),
    favorites: z.number().optional(),
    downloads: z.number().optional(),
    reviews: z.number().optional(),
    lastPlayed: z.string().optional(),
    playTime: z.string().optional()
  }),

  // Player controls and state
  player: z.object({
    controls: GamePlayerControlsSchema,
    state: GamePlayerStateSchema.optional()
  }),

  // Game information
  info: z.object({
    description: z.string(),
    shortDescription: z.string(),
    tags: z.array(z.string()),
    releaseDate: z.string(),
    lastUpdated: z.string().optional(),
    version: z.string().optional(),
    size: z.string().optional(),
    languages: z.array(z.string()).optional(),
    ageRating: z.string().optional(),
    developer: z.object({
      name: z.string(),
      url: z.string().optional(),
      logo: z.string().optional(),
      description: z.string().optional(),
      socialLinks: z.object({
        website: z.string().optional(),
        discord: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional()
      }).optional()
    }),
    publisher: z.object({
      name: z.string(),
      url: z.string().optional(),
      logo: z.string().optional()
    }).optional()
  }),

  // Media/Screenshots
  media: z.object({
    screenshots: z.array(z.object({
      url: z.string(),
      thumbnail: z.string(),
      caption: z.string().optional(),
      type: z.enum(['image', 'video']).default('image'),
      duration: z.string().optional()
    }))
  }),

  // Features
  features: z.object({
    main: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional()
    })),
    additional: z.array(z.string()).optional()
  }),

  // Reviews
  reviews: z.object({
    summary: z.object({
      average: z.number().min(0).max(5),
      total: z.number(),
      distribution: z.array(z.number()).length(5)
    }),
    featured: z.array(z.object({
      id: z.string(),
      user: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        verified: z.boolean().optional()
      }),
      rating: z.number().min(0).max(5),
      content: z.string(),
      date: z.string(),
      likes: z.number().optional(),
      platform: PlatformSchema.optional(),
      playTime: z.string().optional()
    }))
  }).optional(),

  // Similar/Related games
  related: z.object({
    byCategory: z.array(GamePreviewSchema),
    byDeveloper: z.array(GamePreviewSchema).optional(),
    byTags: z.array(GamePreviewSchema).optional(),
    recommended: z.array(GamePreviewSchema).optional(),
    playedTogether: z.array(GamePreviewSchema).optional()
  }).optional(),

  // System requirements
  requirements: z.object({
    minimum: z.object({
      os: z.array(z.string()),
      processor: z.string(),
      memory: z.string(),
      graphics: z.string(),
      storage: z.string(),
      additional: z.array(z.string()).optional()
    }),
    recommended: z.object({
      os: z.array(z.string()),
      processor: z.string(),
      memory: z.string(),
      graphics: z.string(),
      storage: z.string(),
      additional: z.array(z.string()).optional()
    }).optional()
  }).optional(),

  // How to play
  howToPlay: z.array(z.object({
    image: z.string(),
    title: z.string(),
    description: z.string(),
    controls: z.array(z.object({
      key: z.string(),
      action: z.string(),
      icon: z.string().optional(),
      description: z.string().optional()
    }))
  })).optional(),

  // Comments
  comments: z.object({
    total: z.number(),
    items: z.array(z.object({
      id: z.string(),
      user: z.object({
        id: z.string(),
        name: z.string(),
        avatar: z.string().optional(),
        badges: z.array(z.string()).optional()
      }),
      content: z.string(),
      date: z.string(),
      likes: z.number().default(0),
      replies: z.array(z.object({
        id: z.string(),
        user: z.object({
          id: z.string(),
          name: z.string(),
          avatar: z.string().optional()
        }),
        content: z.string(),
        date: z.string(),
        likes: z.number().default(0)
      })).optional(),
      pinned: z.boolean().default(false)
    })),
    pagination: z.object({
      page: z.number().default(1),
      perPage: z.number().default(10),
      totalPages: z.number()
    })
  }).optional(),

  // Achievement system
  achievements: z.object({
    total: z.number(),
    unlocked: z.number(),
    items: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      icon: z.string(),
      rarity: z.enum(['common', 'uncommon', 'rare', 'epic', 'legendary']),
      progress: z.number().min(0).max(100).optional(),
      unlockedAt: z.string().optional()
    }))
  }).optional(),

  // Monetization
  monetization: z.object({
    type: z.enum(['free', 'premium', 'freemium']),
    price: z.number().optional(),
    currency: z.string().optional(),
    subscriptionPlans: z.array(z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
      currency: z.string(),
      period: z.enum(['daily', 'weekly', 'monthly', 'yearly']),
      features: z.array(z.string())
    })).optional(),
    inAppPurchases: z.array(z.object({
      id: z.string(),
      name: z.string(),
      description: z.string(),
      price: z.number(),
      currency: z.string(),
      type: z.enum(['consumable', 'non_consumable', 'subscription'])
    })).optional()
  }).optional()
});

export type GameDetail = z.infer<typeof GameDetailSchema>;
// Hero Section
export const GameDetailHeroSchema = z.object({
  id: z.string(),
  type: z.literal('gameDetailHero'),
  game: z.object({
    description: z.string(),
    embed: z.object({
      iframeUrl: z.string(),
      fullscreenUrl: z.string(),
      thumbnail: z.string(),
      responsive: z.boolean().default(true),
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
      loading: z.enum(['eager', 'lazy']).default('eager'),
      communication: z.object({
        enabled: z.boolean().default(false),
        targetOrigin: z.string().optional(),
        events: z.array(z.string()).optional(),
        methods: z.array(z.string()).optional()
      }).optional()
    }),
    quickStats: z.object({
      rating: z.number(),
      plays: z.number(),
      favorites: z.number().optional(),
      downloads: z.number().optional(),
      reviews: z.number().optional(),
      lastPlayed: z.string().optional(),
      playTime: z.string().optional()
    }),
    controls: GamePlayerControlsSchema,
    state: GamePlayerStateSchema.optional()
  })
});

// Info Section
export const GameDetailInfoSchema = z.object({
  id: z.string(),
  type: z.literal('gameDetailInfo'),
  info: z.object({
    description: z.string(),
    shortDescription: z.string(),
    tags: z.array(z.string()),
    releaseDate: z.string(),
    lastUpdated: z.string().optional(),
    version: z.string().optional(),
    size: z.string().optional(),
    languages: z.array(z.string()).optional(),
    ageRating: z.string().optional(),
    developer: z.object({
      name: z.string(),
      url: z.string().optional(),
      logo: z.string().optional(),
      description: z.string().optional(),
      socialLinks: z.object({
        website: z.string().optional(),
        discord: z.string().optional(),
        twitter: z.string().optional(),
        youtube: z.string().optional()
      }).optional()
    }),
    publisher: z.object({
      name: z.string(),
      url: z.string().optional(),
      logo: z.string().optional()
    }).optional()
  })
});

// Media Section
export const GameDetailMediaSchema = z.object({
  id: z.string(),
  type: z.literal('gameDetailMedia'),
  media: z.object({
    screenshots: z.array(z.object({
      url: z.string(),
      thumbnail: z.string(),
      caption: z.string().optional(),
      type: z.enum(['image', 'video']).default('image'),
      duration: z.string().optional()
    }))
  })
});

// Features Section
export const GameDetailFeaturesSchema = z.object({
  id: z.string(),
  type: z.literal('gameDetailFeatures'),
  features: z.object({
    main: z.array(z.object({
      title: z.string(),
      description: z.string(),
      icon: z.string().optional()
    })),
    additional: z.array(z.string()).optional()
  })
});

// Reviews Section
export const GameDetailReviewsSchema = z.object({
  id: z.string(),
  type: z.literal('gameDetailReviews'),
  reviews: z.object({
    summary: z.object({
      average: z.number().min(0).max(5),
      total: z.number(),
      distribution: z.array(z.number()).length(5)
    }),
    featured: z.array(z.object({
      id: z.string(),
      user: z.object({
        name: z.string(),
        avatar: z.string().optional(),
        verified: z.boolean().optional()
      }),
      rating: z.number().min(0).max(5),
      content: z.string(),
      date: z.string(),
      likes: z.number().optional(),
      platform: PlatformSchema.optional(),
      playTime: z.string().optional()
    })),
    settings: z.object({
      itemsPerPage: z.number().optional(),
      sortOptions: z.array(z.string()).optional(),
      filterOptions: z.array(z.string()).optional()
    }).optional()
  })
});

// Enhanced Similar/Related Games Section
export const GameDetailSimilarSchema = z.object({
  id: z.string(),
  type: z.literal('gameDetailSimilar'),
  similar: z.object({
    // Games from same category
    byCategory: z.array(GamePreviewSchema),
    // Games from same developer
    byDeveloper: z.array(GamePreviewSchema).optional(),
    // Games with similar tags/gameplay
    byTags: z.array(GamePreviewSchema).optional(),
    // Curated recommendations
    recommended: z.array(GamePreviewSchema).optional(),
    // Games often played together
    playedTogether: z.array(GamePreviewSchema).optional(),
    // Display options
    display: z.object({
      layout: z.enum(['grid', 'carousel', 'list']).default('grid'),
      grouping: z.enum(['tabs', 'sections', 'mixed']).default('tabs'),
      itemsPerGroup: z.number().default(4),
      showMoreLink: z.boolean().default(true),
      sorting: z.object({
        type: z.enum(['relevance', 'rating', 'popularity', 'recent']).default('relevance'),
        direction: z.enum(['asc', 'desc']).default('desc')
      }).optional(),
      filters: z.object({
        showPlatformFilter: z.boolean().default(false),
        showCategoryFilter: z.boolean().default(false),
        showTagFilter: z.boolean().default(false)
      }).optional()
    }).optional(),
    // Section specific metadata
    meta: z.object({
      sectionTitle: z.string().optional(),
      descriptions: z.object({
        byCategory: z.string().optional(),
        byDeveloper: z.string().optional(),
        byTags: z.string().optional(),
        recommended: z.string().optional(),
        playedTogether: z.string().optional()
      }).optional(),
      viewAllLinks: z.object({
        byCategory: z.string().optional(),
        byDeveloper: z.string().optional(),
        byTags: z.string().optional(),
        recommended: z.string().optional(),
        playedTogether: z.string().optional()
      }).optional()
    }).optional()
  })
});

// Requirements Section
export const GameDetailRequirementsSchema = z.object({
  id: z.string(),
  type: z.literal('gameDetailRequirements'),
  requirements: z.object({
    minimum: z.object({
      os: z.array(z.string()),
      processor: z.string(),
      memory: z.string(),
      graphics: z.string(),
      storage: z.string(),
      additional: z.array(z.string()).optional()
    }),
    recommended: z.object({
      os: z.array(z.string()),
      processor: z.string(),
      memory: z.string(),
      graphics: z.string(),
      storage: z.string(),
      additional: z.array(z.string()).optional()
    }).optional()
  })
});

// How to Play Section
export const GameDetailHowToPlaySchema = z.object({
  id: z.string(),
  type: z.literal('gameDetailHowToPlay'),
  howToPlay: z.array(z.object({
    image: z.string(),
    title: z.string(),
    description: z.string(),
    controls: z.array(z.object({
      key: z.string(),
      action: z.string(),
      icon: z.string().optional(),
      description: z.string().optional()
    }))
  }))
});

// Export all types
export type GameDetailHero = z.infer<typeof GameDetailHeroSchema>;
export type GameDetailInfo = z.infer<typeof GameDetailInfoSchema>;
export type GameDetailMedia = z.infer<typeof GameDetailMediaSchema>;
export type GameDetailFeatures = z.infer<typeof GameDetailFeaturesSchema>;
export type GameDetailReviews = z.infer<typeof GameDetailReviewsSchema>;
export type GameDetailSimilar = z.infer<typeof GameDetailSimilarSchema>;
export type GameDetailRequirements = z.infer<typeof GameDetailRequirementsSchema>;
export type GameDetailHowToPlay = z.infer<typeof GameDetailHowToPlaySchema>;

// Export all schemas
export const detailSectionSchemas = {
  hero: GameDetailHeroSchema,
  info: GameDetailInfoSchema,
  media: GameDetailMediaSchema,
  features: GameDetailFeaturesSchema,
  reviews: GameDetailReviewsSchema,
  similar: GameDetailSimilarSchema,
  requirements: GameDetailRequirementsSchema,
  howToPlay: GameDetailHowToPlaySchema
};

// Combined detail section type
export type GameDetailSection =
  | GameDetailHero
  | GameDetailInfo
  | GameDetailMedia
  | GameDetailFeatures
  | GameDetailReviews
  | GameDetailSimilar
  | GameDetailRequirements
  | GameDetailHowToPlay;