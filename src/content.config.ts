import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const specimens = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/specimens" }),
  schema: z.object({
    title: z.string(),
    specimenNumber: z.string(),
    classification: z.string(),
    habitat: z.string(),
    firstObserved: z.string(),
    status: z.enum(["active", "in-progress", "dormant", "shipped"]),
    platform: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    images: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    excerpt: z.string(),
    order: z.number().optional(),
  }),
});

const journal = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/journal" }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    excerpt: z.string(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { specimens, journal };
