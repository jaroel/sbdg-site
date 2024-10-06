import { z } from "zod";
import type { ZodFormattedError } from "zod";
import { contentObjectsTableSchema } from "./db/schemas";
import { contentSchema } from "./db/tables/contentObjects.table";
export type ContentViews = z.infer<typeof contentViews>;
export const contentViews = z.union([
  z.literal("default"),
  z.literal("add"),
  z.literal("edit"),
  z.literal("delete"),
]);

// Add
export const contentObjectAddSchema = contentObjectsTableSchema
  .omit({
    id: true,
    parentPath: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    parentId: z.number().min(1),
  })
  .required({ parentId: true });

// Edit
export const contentObjectEditFormFieldsSchema = contentObjectsTableSchema.omit(
  {
    parentId: true,
    parentPath: true,
    createdAt: true,
    updatedAt: true,
  },
);
export const contentObjectEditFormSchema =
  contentObjectEditFormFieldsSchema.extend({
    routePrefix: contentViews,
  });

// Edit root
export const contentObjectEditRootFormFieldsSchema =
  contentObjectEditFormFieldsSchema.omit({ slug: true });
export const contentObjectEditRootFormSchema =
  contentObjectEditRootFormFieldsSchema.extend({
    routePrefix: contentViews,
  });

// Delete
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

export const contentObjectDeleteFormSchema = contentObjectDeleteSchema.extend({
  routePrefix: contentViews,
});

// View

const fullCntentSchema = contentSchema.extend({ path: z.string().readonly() });

export const contentObjectSchema = z.object({
  content: fullCntentSchema,
  children: fullCntentSchema.array(),
  parents: fullCntentSchema.array(),
  errors: z.custom<ZodFormattedError<typeof fullCntentSchema>>().optional(),
});
