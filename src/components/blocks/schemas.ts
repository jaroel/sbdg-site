import * as z from "zod";

export type TextBlock = z.infer<typeof textBlockSchema>;
export const textBlockSchema = z.object({
  type: z.literal("text"),
  text: z.string().trim().min(1),
});

export type NestedBlock = z.infer<typeof nestedBlockSchema>;
export const nestedBlockSchema = z.object({
  type: z.literal("nested"),
  nestedTitle: z.string().trim().min(1),
  texts: z.array(z.discriminatedUnion("type", [textBlockSchema])).optional(),
});

export type PageBlock = z.infer<typeof pageBlockSchema>;
export const pageBlockSchema = z.object({
  type: z.literal("page"),
  title: z.string().trim().min(1),
  description: z.optional(z.string().trim()),
  blocks: z.array(
    z.discriminatedUnion("type", [textBlockSchema, nestedBlockSchema]),
  ),
});

export type BlockTypes = z.infer<typeof blockTypesSchema>;
export type BlockKeys = z.infer<typeof blockTypesSchema>["type"];
export const blockTypesSchema = z.union([
  textBlockSchema,
  pageBlockSchema,
  nestedBlockSchema,
]);
