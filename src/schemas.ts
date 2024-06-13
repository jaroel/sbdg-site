import { z } from "zod";
import { contentObjectsTableSchema } from "./db/schemas";

export const contentObjectAddSchema = z.object({
  object: contentObjectsTableSchema
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
  object: contentObjectsTableSchema
    .omit({
      path: true,
      createdAt: true,
      updatedAt: true,
    })
    .required({ id: true }),
  slug: z.string().trim().min(1),
});

export const contentObjectEditRootSchema = contentObjectEditSchema.extend({
  slug: z.literal("/"),
});

export type ContentViews = z.infer<typeof contentViews>;
export const contentViews = z.union([
  z.literal("default"),
  z.literal("add"),
  z.literal("edit"),
]);
