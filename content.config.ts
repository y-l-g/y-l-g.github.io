import { defineCollection, defineContentConfig, z } from "@nuxt/content";

const createBaseSchema = () =>
  z.object({
    title: z.string(),
    description: z.string(),
  });

const createSeoSchema = () =>
  z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    canonical: z.string().optional(),
    noindex: z.boolean().optional(),
  });

const createButtonSchema = () =>
  z.object({
    label: z.string(),
    icon: z.string().optional(),
    to: z.string().optional(),
    color: z
      .enum(["primary", "neutral", "success", "warning", "error", "info"])
      .optional(),
    size: z.enum(["xs", "sm", "md", "lg", "xl"]).optional(),
    variant: z
      .enum(["solid", "outline", "subtle", "soft", "ghost", "link"])
      .optional(),
    target: z.enum(["_blank", "_self"]).optional(),
  });

const createImageSchema = () =>
  z.object({
    src: z.string().editor({ input: "media" }),
    alt: z.string(),
  });

const createAuthorSchema = () =>
  z.object({
    name: z.string(),
    description: z.string().optional(),
    username: z.string().optional(),
    twitter: z.string().optional(),
    to: z.string().optional(),
    avatar: createImageSchema().optional(),
  });

const createTestimonialSchema = () =>
  z.object({
    quote: z.string(),
    author: createAuthorSchema(),
  });

const createProjectSchema = () =>
  z.object({
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()).optional(),
    links: z.array(createButtonSchema()),
  });

const createFaqItemSchema = () =>
  z.object({
    label: z.string().nonempty(),
    content: z.string().nonempty(),
  });

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: "page",
      source: [{ include: "index.yml" }, { include: "en/index.yml" }],
      schema: createBaseSchema().extend({
        seo: createSeoSchema().optional(),
        hero: z.object({
          links: z.array(createButtonSchema()),
          images: z.array(createImageSchema()),
        }),
        about: createBaseSchema().extend({
          items: z.array(
            createBaseSchema().extend({
              icon: z.string().optional(),
            }),
          ).optional(),
        }),
        services: createBaseSchema()
          .extend({
            items: z.array(
              createBaseSchema().extend({
                icon: z.string().optional(),
                to: z.string(),
              }),
            ),
          })
          .optional(),
        projects: createBaseSchema().extend({
          items: z.array(createProjectSchema()),
        }),
        experience: createBaseSchema().extend({
          items: z.array(
            z.object({
              date: z.date(),
              position: z.string(),
              company: z.object({
                name: z.string(),
                url: z.string(),
                logo: z.string().editor({ input: "icon" }),
                color: z.string(),
              }),
            }),
          ),
        }),
        testimonials: z.array(createTestimonialSchema()),
        blog: createBaseSchema(),
        faq: createBaseSchema().extend({
          categories: z.array(
            z.object({
              title: z.string().nonempty(),
              questions: z.array(createFaqItemSchema()),
            }),
          ),
        }),
      }),
    }),
    blog: defineCollection({
      type: "page",
      source: [{ include: "blog/*.md" }, { include: "en/blog/*.md" }],
      schema: createBaseSchema().extend({
        seo: createSeoSchema().optional(),
        minRead: z.number(),
        date: z.date(),
        dateModified: z.date().optional(),
        image: z.string().nonempty().editor({ input: "media" }),
        author: createAuthorSchema(),
      }),
    }),
    pages: defineCollection({
      type: "page",
      source: [{ include: "blog.yml" }, { include: "en/blog.yml" }],
      schema: createBaseSchema().extend({
        seo: createSeoSchema().optional(),
        links: z.array(createButtonSchema()),
      }),
    }),
    services: defineCollection({
      type: "page",
      source: [
        { include: "services/*.yml" },
        { include: "en/services/*.yml" },
      ],
      schema: createBaseSchema().extend({
        seo: createSeoSchema().optional(),
        headline: z.string(),
        audience: z.string(),
        outcomes: z.array(z.string()),
        services: z.array(
          createBaseSchema().extend({
            icon: z.string().optional(),
          }),
        ),
        process: z.array(createBaseSchema()),
        proof: z.array(createBaseSchema()),
        faq: z.array(createFaqItemSchema()),
        cta: createBaseSchema().extend({
          primaryLabel: z.string(),
          secondaryLabel: z.string().optional(),
        }),
      }),
    }),
    projects: defineCollection({
      type: "page",
      source: [
        { include: "projects/*.yml" },
        { include: "en/projects/*.yml" },
      ],
      schema: createBaseSchema().extend({
        seo: createSeoSchema().optional(),
        headline: z.string(),
        role: z.string(),
        stack: z.array(z.string()),
        outcomes: z.array(z.string()),
        body: z.array(createBaseSchema()),
        links: z.array(createButtonSchema()),
        relatedServices: z.array(
          z.object({
            label: z.string(),
            to: z.string(),
          }),
        ),
      }),
    }),
    speaking: defineCollection({
      type: "page",
      source: "speaking.yml",
      schema: z.object({
        links: z.array(createButtonSchema()),
        events: z.array(
          z.object({
            category: z.enum(["Live talk", "Podcast", "Conference"]),
            title: z.string(),
            date: z.date(),
            location: z.string(),
            url: z.string().optional(),
          }),
        ),
      }),
    }),
    about: defineCollection({
      type: "page",
      source: "about.yml",
      schema: z.object({
        content: z.object({}),
        images: z.array(createImageSchema()),
      }),
    }),
  },
});
