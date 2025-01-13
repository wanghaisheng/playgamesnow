import { z } from 'astro:content';

// Base Schemas
export const sectionMetaSchema = z.object({
  sectionTitle: z.string(),
  sectionHeading: z.string(),
  sectionDescription: z.string(),
});

export const buttonSchema = z.object({
  text: z.string(),
  link: z.string(),
  primary: z.boolean()
});

// Section Schemas
export const heroSchema = z.object({
  id: z.string(),
  type: z.literal('hero'),
  sectionMeta: z.object({
    heading: z.string(),
    headingHighlight: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    backgroundVideo: z.string().optional()
  }),
  items: z.object({
    primaryButton: z.object({
      text: z.string(),
      href: z.string()
    }),
    secondaryButton: z.object({
      text: z.string(),
      href: z.string()
    }),
    brands: z.object({
      title: z.string(),
      items: z.array(z.object({
        name: z.string(),
        image: z.string(),
        href: z.string()
      }))
    })
  })
});

export const featuresSchema = z.object({
  id: z.string(),
  type: z.literal('features'),
  sectionMeta: sectionMetaSchema,
  items: z.array(z.object({
    id: z.string(),
    icon: z.string(),
    title: z.string(),
    refTitle: z.string(),
    ref: z.string(),
    description: z.string()
  }))
});

export const faqSchema = z.object({
  id: z.string(),
  type: z.literal('faqs'),
  sectionMeta: sectionMetaSchema,
  items: z.array(z.object({
    id: z.string(),
    title: z.string(),
    description: z.string()
  }))
});

export const pricingSchema = z.object({
  id: z.string(),
  type: z.literal('pricing'),
  sectionMeta: sectionMetaSchema,
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
});

export const testimonialSchema = z.object({
  id: z.string(),
  type: z.literal('testimonials'),
  sectionMeta: sectionMetaSchema,
  items: z.array(z.object({
    content: z.string(),
    author: z.string(),
    position: z.string(),
    image: z.string()
  }))
});

export const teamSchema = z.object({
  id: z.string(),
  type: z.literal('team'),
  sectionMeta: sectionMetaSchema,
  items: z.array(z.object({
    name: z.string(),
    position: z.string(),
    image: z.string(),
    socials: z.array(z.object({
      name: z.string(),
      url: z.string()
    }))
  }))
});

export const clientsSchema = z.object({
  id: z.string(),
  type: z.literal('clients'),
  sectionMeta: sectionMetaSchema,
  items: z.array(z.object({
    name: z.string(),
    ref: z.string(),
    image: z.string(),
    whiteImage: z.string()
  }))
});

export const contactSchema = z.object({
  id: z.string(),
  type: z.literal('contact'),
  sectionMeta: sectionMetaSchema,
  contactInfo: z.object({
    address: z.string(),
    phone: z.string(),
    email: z.string()
  })
});

export const ctaSchema = z.object({
  id: z.string(),
  type: z.literal('cta'),
  title: z.string(),
  description: z.string(),
  buttonText: z.string(),
  buttonLink: z.string()
});

export const blogSchema = z.object({
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
});

// Type exports
export type SectionMeta = z.infer<typeof sectionMetaSchema>;
export type Button = z.infer<typeof buttonSchema>;
export type Hero = z.infer<typeof heroSchema>;
export type Features = z.infer<typeof featuresSchema>;
export type FAQ = z.infer<typeof faqSchema>;
export type Pricing = z.infer<typeof pricingSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Team = z.infer<typeof teamSchema>;
export type Clients = z.infer<typeof clientsSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type CTA = z.infer<typeof ctaSchema>;
export type Blog = z.infer<typeof blogSchema>;

// Export all schemas
export const saasSchemas = {
  sectionMeta: sectionMetaSchema,
  button: buttonSchema,
  hero: heroSchema,
  features: featuresSchema,
  faq: faqSchema,
  pricing: pricingSchema,
  testimonial: testimonialSchema,
  team: teamSchema,
  clients: clientsSchema,
  contact: contactSchema,
  cta: ctaSchema,
  blog: blogSchema
};