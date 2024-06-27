import * as z from "zod";

export type TiptapMarkBold = z.infer<typeof tiptapMarkBoldSchema>;
export const tiptapMarkBoldSchema = z.object({
  type: z.literal("bold"),
  attrs: z.optional(z.record(z.any())),
});

export type TiptapMarkItalic = z.infer<typeof tiptapMarkItalicSchema>;
export const tiptapMarkItalicSchema = z.object({
  type: z.literal("italic"),
  attrs: z.optional(z.record(z.any())),
});

export type TiptapMarkType = z.infer<typeof blocksSchema>["type"];
export type TiptapMark = z.infer<typeof tiptapMarkSchema>;
export const tiptapMarkSchema = z.discriminatedUnion("type", [
  tiptapMarkBoldSchema,
  tiptapMarkItalicSchema,
]);

export type TiptapText = z.infer<typeof tiptapTextSchema>;
const tiptapTextSchema = z
  .object({
    type: z.literal("text"),
    text: z.string().trim().min(1),
    marks: z.array(tiptapMarkSchema).optional(),
  })
  .strict();

export type TiptapParagraph = z.infer<typeof tiptapParagraphSchema>;
const tiptapParagraphSchema = z.object({
  type: z.literal("paragraph"),
  content: z.array(z.discriminatedUnion("type", [tiptapTextSchema])),
});

export type TiptapDoc = z.infer<typeof tiptapDocSchema>;
export const tiptapDocSchema = z.object({
  type: z.literal("doc"),
  content: z.array(z.discriminatedUnion("type", [tiptapParagraphSchema])),
});

export type TiptapElementType = TiptapElement["type"];
export type TiptapElement = z.infer<typeof tiptapElementSchema>;
export const tiptapElementSchema = z.union([
  tiptapDocSchema,
  tiptapParagraphSchema,
  tiptapTextSchema,
]);

export type TextBlock = z.infer<typeof textBlockSchema>;
export const textBlockSchema = z.object({
  type: z.literal("text"),
  text: tiptapDocSchema,
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

export type BlockType = Block["type"];
export type Block = z.infer<typeof blocksSchema>;
export const blocksSchema = z.union([
  textBlockSchema,
  pageBlockSchema,
  nestedBlockSchema,
]);
