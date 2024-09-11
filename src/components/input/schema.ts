import { z } from "zod";

export type TiptapMarkBold = z.infer<typeof tiptapMarkBoldSchema>;
const tiptapMarkBoldSchema = z.object({
  type: z.literal("bold"),
  attrs: z.optional(z.record(z.any())),
});

export type TiptapMarkItalic = z.infer<typeof tiptapMarkItalicSchema>;
const tiptapMarkItalicSchema = z.object({
  type: z.literal("italic"),
  attrs: z.optional(z.record(z.any())),
});

export type TiptapMarkType = z.infer<typeof tiptapMarkSchema>["type"];
export type TiptapMark = z.infer<typeof tiptapMarkSchema>;
const tiptapMarkSchema = z.discriminatedUnion("type", [
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
