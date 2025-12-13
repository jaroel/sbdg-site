import * as v from 'valibot';

export type TiptapMarkBold = v.InferInput<typeof tiptapMarkBoldSchema>;
const tiptapMarkBoldSchema = v.object({
  type: v.literal("bold"),
  attrs: v.optional(v.object({})),
});

export type TiptapMarkItalic = v.InferInput<typeof tiptapMarkItalicSchema>;
const tiptapMarkItalicSchema = v.object({
  type: v.literal("italic"),
  attrs: v.optional(v.object({})),
});

export type TiptapMarkLink = v.InferInput<typeof tiptapMarkLinkSchema>;
export const tiptapMarkLinkSchema = v.object({
  type: v.literal("link"),
  attrs: v.object({
    href: v.pipe(v.string(), v.trim(), v.minLength(1)),
    target: v.optional(v.union([v.literal("_self"), v.literal("_blank")])),
    rel: v.optional(v.pipe(v.string(), v.trim())),
    class: v.optional(v.pipe(v.string(), v.trim())),
  }),
});

export type TiptapMarkType = v.InferInput<typeof tiptapMarkSchema>["type"];
export type TiptapMark = v.InferInput<typeof tiptapMarkSchema>;
const tiptapMarkSchema = v.variant("type", [
  tiptapMarkBoldSchema,
  tiptapMarkItalicSchema,
  tiptapMarkLinkSchema,
]);

export type TiptapText = v.InferInput<typeof tiptapTextSchema>;
const tiptapTextSchema = v.strictObject({
    type: v.literal("text"),
    text: v.pipe(v.string(), v.trim(), v.minLength(1)),
    marks: v.optional(v.array(tiptapMarkSchema)),
  });

export type TiptapParagraph = v.InferInput<typeof tiptapParagraphSchema>;
const tiptapParagraphSchema = v.object({
  type: v.literal("paragraph"),
  content: v.array(tiptapTextSchema),
});

export type TiptapDoc = v.InferInput<typeof tiptapDocSchema>;
export const tiptapDocSchema = v.object({
  type: v.literal("doc"),
  content: v.array(v.variant("type", [tiptapParagraphSchema])),
});
