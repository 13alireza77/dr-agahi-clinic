import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const services = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/services" }),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    // Second half of the article headline («فیلر صورت؛ …»), shown above the page title.
    tagline: z.string().optional(),
    short: z.string(),
    seoTitle: z.string(),
    description: z.string(),
    // Services with a poster (photo + highlights) appear in the poster list; the rest only get a page.
    photo: z.string().optional(),
    photoAlt: z.string().default(""),
    lead: z.string(),
    // Bullets on the services list; `icon` is a name from components/Icon.astro.
    highlights: z.object({ title: z.string(), items: z.array(z.object({ text: z.string(), icon: z.string() })) }).optional(),
    // «نکات مهم قبل از تصمیم‌گیری» cards
    considerations: z.array(z.object({ title: z.string(), text: z.string(), icon: z.string() })).default([]),
    // Before / after care lists
    care: z.array(z.object({ title: z.string(), items: z.array(z.string()) })).default([]),
    itemsTitle: z.string().default(""),
    items: z.array(z.object({ id: z.string(), title: z.string(), text: z.string() })).default([]),
    suitable: z.array(z.string()).default([]),
    steps: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  }),
});

export const collections = { services };
