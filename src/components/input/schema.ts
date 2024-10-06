import { z } from "zod";

export type TiptapMarkBold = z.infer<typeof tiptapMarkBoldSchema>;
const tiptapMarkBoldSchema = z.object({
  type: z.literal("bold"),
  attrs: z.optional(z.object({})),
});

export type TiptapMarkItalic = z.infer<typeof tiptapMarkItalicSchema>;
const tiptapMarkItalicSchema = z.object({
  type: z.literal("italic"),
  attrs: z.optional(z.object({})),
});

export type TiptapMarkLink = z.infer<typeof tiptapMarkLinkSchema>;
export const tiptapMarkLinkSchema = z.object({
  type: z.literal("link"),
  attrs: z.object({
    href: z.string().trim().min(1),
    target: z.literal("_self").or(z.literal("_blank")).optional(),
    rel: z.string().trim().optional(),
    class: z.string().trim().optional(),
  }),
});

export type TiptapMarkType = z.infer<typeof tiptapMarkSchema>["type"];
export type TiptapMark = z.infer<typeof tiptapMarkSchema>;
const tiptapMarkSchema = z.discriminatedUnion("type", [
  tiptapMarkBoldSchema,
  tiptapMarkItalicSchema,
  tiptapMarkLinkSchema,
]);

export type TiptapText = z.infer<typeof tiptapTextSchema>;
const tiptapTextSchema = z
  .object({
    type: z.literal("text"),
    text: z.string().min(1),
    marks: z.array(tiptapMarkSchema).optional(),
  })
  .strict();

export type TiptapParagraph = z.infer<typeof tiptapParagraphSchema>;
const tiptapParagraphSchema = z.object({
  type: z.literal("paragraph"),
  content: tiptapTextSchema.array(),
});

export type TiptapDoc = z.infer<typeof tiptapDocSchema>;
export const tiptapDocSchema = z.object({
  type: z.literal("doc"),
  content: z.array(z.discriminatedUnion("type", [tiptapParagraphSchema])),
});
