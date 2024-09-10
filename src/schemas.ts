import { z } from "zod";
import { contentObjectsTableSchema } from "./db/schemas";

export type ContentViews = z.infer<typeof contentViews>;
export const contentViews = z.union([
  z.literal("default"),
  z.literal("add"),
  z.literal("edit"),
  z.literal("delete"),
]);

export const contentObjectAddSchema = contentObjectsTableSchema
  .omit({
    id: true,
    path: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    parentId: z.number().min(1),
    slug: z.string().trim().min(1),
  })
  .required({ parentId: true });

export const contentObjectEditSchema = contentObjectsTableSchema
  .omit({
    parentId: true,
    path: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    slug: z.string().trim().min(1),
  })
  .required({ id: true });

export const contentObjectEditFormSchema = contentObjectEditSchema.extend({
  routePrefix: contentViews,
});

export const contentObjectEditRootSchema = contentObjectEditSchema.omit({
  slug: true,
});

export const contentObjectDeleteSchema = contentObjectsTableSchema
  .pick({
    id: true,
  })
  .extend({
    confirmation: z.literal("delete me"),
  })
  .required({ id: true });

export const fileAddSchema = z.object({
  someFile: z.instanceof(File),
});

export type ContentObjectAddFormSchema = z.infer<
  typeof contentObjectAddFormSchema
>;
export const contentObjectAddFormSchema = contentObjectAddSchema.extend({
  routePrefix: contentViews,
});

export const contentObjectEditRootFormSchema =
  contentObjectEditRootSchema.extend({
    routePrefix: contentViews,
  });

export const contentObjectDeleteFormSchema = contentObjectDeleteSchema.extend({
  routePrefix: contentViews,
});
