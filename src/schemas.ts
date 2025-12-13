import * as v from 'valibot';
// import type { ZodFormattedError } from "zod";
// import { z } from "zod";
import { contentObjectsTableSchema } from "./db/schemas";
import { contentSchema } from "./db/tables/contentObjects.table";
// import { path, parentPath, slug } from "./zod";
export type ContentViews = v.InferInput<typeof contentViews>;
export const contentViews = v.union([
  v.literal("default"),
  v.literal("add"),
  v.literal("edit"),
  v.literal("delete"),
]);

// Add
export const contentObjectAddSchema = v.object({
  ...v.omit(contentObjectsTableSchema, ["id", "parentPath", "createdAt", "updatedAt"]).entries,
  ...{
    parentId: v.pipe(v.number(), v.minValue(1))
  }

})
  

// Edit
export const contentObjectEditFormFieldsSchema = v.omit(contentObjectsTableSchema,
  [
    "parentId",
    "parentPath",
    "createdAt",
    "updatedAt",
  ],
);

export const contentObjectEditFormSchema = v.object({
  ...contentObjectEditFormFieldsSchema.entries,
  routePrefix: contentViews
});

// Edit root
export const contentObjectEditRootFormFieldsSchema =
  v.omit(contentObjectEditFormFieldsSchema, ["slug"]);
export const contentObjectEditRootFormSchema = v.object({...contentObjectEditRootFormFieldsSchema.entries,
    routePrefix: contentViews,
  });

// Delete
export const contentObjectDeleteSchema = 
  v.object({...v.pick(contentObjectsTableSchema, ["id"]).entries, 
    confirmation: v.literal("delete me"),
  })

export const fileAddSchema = v.object({
  someFile: v.file(),
});

export type ContentObjectAddFormSchema = v.InferInput<
  typeof contentObjectAddFormSchema
>;
export const contentObjectAddFormSchema = v.object({
  ...contentObjectAddSchema.entries,
  routePrefix: contentViews,
});

export const contentObjectDeleteFormSchema = v.object({
  ...contentObjectDeleteSchema.entries,
  routePrefix: contentViews,
});

// View
export const fullContentSchema = v.object({
  ...contentSchema.entries,
  parentPath: v.string(),
  slug: v.string(),
  path: v.pipe(v.string(), v.readonly()),
});


export const contentObjectSchema = v.object({
  content: fullContentSchema,
  children: v.array(fullContentSchema),
  parents: v.array(fullContentSchema),
  // errors: v.custom<ZodFormattedError<typeof fullContentSchema>>().optional(),
  errors: v.optional(v.unknown())
});
