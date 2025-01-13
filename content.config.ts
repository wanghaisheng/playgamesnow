import { defineCollection, reference, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

// Blog Collection
const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/data/content" }),
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    bigImg: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    authorImg: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform((str) => new Date(str)),
    author: z.string().default('Pimjolabs'),
    comments: z.string(),
    views: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    postDetails: z.object({
      paraOne: z.string(),
      paraTwo: z.string(),
      title: z.string(),
      paraThree: z.string(),
      titleTwo: z.string(),
      paraFour: z.string(),
      paraFive: z.string(),
    }),
    quotes: z.object({
      quote: z.string(),
      author: z.string(),
    }),
  }),
});

// Section Meta Collection (for all sections)
const sectionMeta = defineCollection({
  schema: z.object({
    sectionTitle: z.string(),
    sectionHeading: z.string(),
    sectionDescription: z.string(),
  })
});

// Features Section
const featuresSection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/features" }),
  schema: z.object({
    sectionMeta: reference('sectionMeta'),
    items: z.array(reference('features_item'))
  })
});

const features_item = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/feature-items" }),
  schema: z.object({
    icon: z.string(),
    title: z.string(),
    refTitle: z.string(),
    ref: z.string(),
    description: z.string()
  })
});

// FAQs Section
const faqsSection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/faqs" }),
  schema: z.object({
    sectionMeta: reference('sectionMeta'),
    items: z.array(reference('faq_item'))
  })
});

const faq_item = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/faq-items" }),
  schema: z.object({
    title: z.string(),
    description: z.string()
  })
});

// Pricing Section
const pricingSection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/pricings" }),
  schema: z.object({
    sectionMeta: reference('sectionMeta'),
    items: z.array(reference('pricing_item'))
  })
});

const pricing_item = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/pricing-items" }),
  schema: z.object({
    packageName: z.string(),
    price: z.string(),
    subtitle: z.string(),
    btn: z.string(),
    purchaseLink: z.string(),
    popular: z.boolean(),
    offerlist: z.array(z.object({
      title: z.string()
    }))
  })
});

// Testimonials Section
const testimonialsSection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/testimonials" }),
  schema: z.object({
    sectionMeta: reference('sectionMeta'),
    items: z.array(reference('testimonial_item'))
  })
});

const testimonial_item = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/testimonial-items" }),
  schema: z.object({
    content: z.string(),
    author: z.string(),
    position: z.string(),
    image: z.string()
  })
});

// Team Section
const teamSection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/team" }),
  schema: z.object({
    sectionMeta: reference('sectionMeta'),
    items: z.array(reference('team_item'))
  })
});

const team_item = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/team-items" }),
  schema: z.object({
    name: z.string(),
    position: z.string(),
    image: z.string(),
    socials: z.array(z.object({
      name: z.string(),
      url: z.string()
    }))
  })
});

// Clients Section
const clientsSection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/clients" }),
  schema: z.object({
    sectionMeta: reference('sectionMeta'),
    items: z.array(reference('client_item'))
  })
});

const client_item = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/client-items" }),
  schema: z.object({
    name: z.string(),
    ref: z.string(),
    image: z.string(),
    whiteImage: z.string()
  })
});

// Contact Section
const contactSection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/contact" }),
  schema: z.object({
    sectionMeta: reference('sectionMeta'),
    contactInfo: z.object({
      address: z.string(),
      phone: z.string(),
      email: z.string()
    })
  })
});

// Hero Section
const heroSection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/hero" }),
  schema: z.object({
    sectionMeta: z.object({
      sectionTitle: z.string(),
      sectionHeading: z.string(),
      sectionDescription: z.string(),
    }),
    items: z.array(z.object({
      image: z.string().optional(),
      buttons: z.array(z.object({
        text: z.string(),
        link: z.string(),
        primary: z.boolean()
      }))
    })),
    backgroundVideo: z.object({
      mp4: z.string().optional(),
      webm: z.string().optional()
    }).optional()
  })
});

// About Section
const aboutSection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/about" }),
  schema: z.object({
    sectionMeta: reference('sectionMeta'),
    content: z.string(),
    image: z.string(),
    features: z.array(z.object({
      title: z.string(),
      description: z.string()
    }))
  })
});

// CTA Section
const ctaSection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/cta" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    buttonText: z.string(),
    buttonLink: z.string()
  })
});

// Sections Collection (for all sections)
const sections = defineCollection({
  loader: glob({ pattern: '**/[^_]*.json', base: "./src/data/json/sections" }),
  schema: z.discriminatedUnion('type', [
    // Features section
    z.object({
      id: z.string(),
      type: z.literal('features'),
      sectionMeta: z.object({
        sectionTitle: z.string(),
        sectionHeading: z.string(),
        sectionDescription: z.string(),
      }),
      items: z.array(z.object({
        id: z.string(),
        icon: z.string(),
        title: z.string(),
        refTitle: z.string(),
        ref: z.string(),
        description: z.string()
      }))
    }),

    // FAQ section
    z.object({
      id: z.string(),
      type: z.literal('faqs'),
      sectionMeta: z.object({
        sectionTitle: z.string(),
        sectionHeading: z.string(),
        sectionDescription: z.string(),
      }),
      items: z.array(z.object({
        id: z.string(),
        title: z.string(),
        description: z.string()
      }))
    }),

    // Pricing section
    z.object({
      id: z.string(),
      type: z.literal('pricing'),
      sectionMeta: z.object({
        sectionTitle: z.string(),
        sectionHeading: z.string(),
        sectionDescription: z.string(),
      }),
      items: z.array(z.object({
        id: z.string(),
        packageName: z.string(),
        price: z.string(),
        subtitle: z.string(),
        btn: z.string(),
        purchaseLink: z.string(),
        popular: z.boolean(),
        offerlist: z.array(z.object({
          title: z.string()
        }))
      }))
    }),

    // Testimonials section
    z.object({
      id: z.string(),
      type: z.literal('testimonials'),
      sectionMeta: z.object({
        sectionTitle: z.string(),
        sectionHeading: z.string(),
        sectionDescription: z.string(),
      }),
      items: z.array(z.object({
        content: z.string(),
        author: z.string(),
        position: z.string(),
        image: z.string()
      }))
    }),

    // Team section
    z.object({
      id: z.string(),
      type: z.literal('team'),
      sectionMeta: z.object({
        sectionTitle: z.string(),
        sectionHeading: z.string(),
        sectionDescription: z.string(),
      }),
      items: z.array(z.object({
        name: z.string(),
        position: z.string(),
        image: z.string(),
        socials: z.array(z.object({
          name: z.string(),
          url: z.string()
        }))
      }))
    }),

    // Clients section
    z.object({
      id: z.string(),
      type: z.literal('clients'),
      sectionMeta: z.object({
        sectionTitle: z.string(),
        sectionHeading: z.string(),
        sectionDescription: z.string(),
      }),
      items: z.array(z.object({
        name: z.string(),
        ref: z.string(),
        image: z.string(),
        whiteImage: z.string()
      }))
    }),

    // Contact section
    z.object({
      id: z.string(),
      type: z.literal('contact'),
      sectionMeta: z.object({
        sectionTitle: z.string(),
        sectionHeading: z.string(),
        sectionDescription: z.string(),
      }),
      contactInfo: z.object({
        address: z.string(),
        phone: z.string(),
        email: z.string()
      })
    }),

    // Hero section
    z.object({
      id: z.string(),
      type: z.literal('hero'),
      sectionMeta: z.object({
        sectionTitle: z.string(),
        sectionHeading: z.string(),
        sectionDescription: z.string(),
      }),
      items: z.array(z.object({
        image: z.string().optional(),
        buttons: z.array(z.object({
          text: z.string(),
          link: z.string(),
          primary: z.boolean()
        }))
      })),
      backgroundVideo: z.object({
        mp4: z.string().optional(),
        webm: z.string().optional()
      }).optional()
    }),

    // CTA section
    z.object({
      id: z.string(),
      type: z.literal('cta'),
      title: z.string(),
      description: z.string(),
      buttonText: z.string(),
      buttonLink: z.string()
    })
  ])
});

// Export all collections
export const collections = {
  blog,
  sections, // Single sections collection
  sectionMeta,
  featuresSection,
  features_item,
  faqsSection,
  faq_item,
  pricingSection,
  pricing_item,
  testimonialsSection,
  testimonial_item,
  teamSection,
  team_item,
  clientsSection,
  client_item,
  contactSection,
  heroSection,
  aboutSection,
  ctaSection
};