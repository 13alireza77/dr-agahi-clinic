import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const services = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/services" }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    short: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    photo: z.string(),
    photoAlt: z.string(),
    lead: z.string(),
    itemsTitle: z.string(),
    items: z.array(z.object({ id: z.string(), title: z.string(), text: z.string() })).default([]),
    suitable: z.array(z.string()).default([]),
    steps: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { services };
