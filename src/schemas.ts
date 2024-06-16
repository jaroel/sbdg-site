import { z } from "zod";
import { contentObjectsTableSchema } from "./db/schemas";

export const contentObjectAddSchema = z.object({
  content: contentObjectsTableSchema
    .omit({
      id: true,
      path: true,
      createdAt: true,
      updatedAt: true,
    })
    .required({ parentId: true }),
  slug: z.string().trim().min(1),
});

export const contentObjectEditSchema = z.object({
  content: contentObjectsTableSchema
    .omit({
      path: true,
      createdAt: true,
      updatedAt: true,
    })
    .required({ id: true }),
  slug: z.string().trim().min(1),
});

export const contentObjectDeleteSchema = z.object({
  content: contentObjectsTableSchema
    .pick({
      id: true,
    })
    .required({ id: true }),
  confirmation: z.literal("delete me"),
});

export type ContentViews = z.infer<typeof contentViews>;
export const contentViews = z.union([
  z.literal("default"),
  z.literal("add"),
  z.literal("edit"),
  z.literal("delete"),
]);
