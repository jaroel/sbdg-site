import * as z from "zod";

export type TextBlock = z.infer<typeof textBlockSchema>;
export const textBlockSchema = z.object({
  type: z.literal("text"),
  text: z.string().min(1),
});

export type PageBlock = z.infer<typeof pageBlockSchema>;
export const pageBlockSchema = z.object({
  type: z.literal("page"),
  title: z.string().min(1),
  description: z.optional(z.string()),
  blocks: z.array(z.discriminatedUnion("type", [textBlockSchema])),
});

export type BlockTypes = z.infer<typeof blockTypesSchema>;
export const blockTypesSchema = z.union([textBlockSchema, pageBlockSchema]);
