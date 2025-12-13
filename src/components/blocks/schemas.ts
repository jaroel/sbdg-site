import * as v from 'valibot';
import { tiptapDocSchema } from "../input/schema";

export type TextBlock = v.InferInput<typeof textBlockSchema>;
export const textBlockSchema = v.object({
  type: v.literal("text"),
  text: tiptapDocSchema,
});

export type NestedBlock = v.InferInput<typeof nestedBlockSchema>;
export const nestedBlockSchema = v.object({
  type: v.literal("nested"),
  nestedTitle: v.pipe(v.string(), v.trim(), v.minLength(1)),
  texts: v.array(v.variant("type", [textBlockSchema])),
});

export type ImageBlock = v.InferInput<typeof imageBlockSchema>;
export const imageBlockSchema = v.object({
  type: v.literal("image"),
  label: v.pipe(v.string(), v.trim(), v.minLength(1)),
  fileId: v.pipe(v.string(), v.trim(), v.minLength(1)),
});

export type TableBlock = v.InferInput<typeof tableBlockSchema>;
export const tableBlockSchema = v.object({
  type: v.literal("table"),
  label: v.pipe(v.string(), v.trim(), v.minLength(1)),
  content: v.array(v.pipe(v.array(v.pipe(v.string(), v.trim(), v.minLength(1))), v.minLength(1)))
});

export type PageBlockBlocks = v.InferInput<typeof pageBlockBlocksSchema>;
const pageBlockBlocksSchema = v.variant("type", [
  textBlockSchema,
  nestedBlockSchema,
  imageBlockSchema,
  tableBlockSchema,
]);

export type PageBlock = v.InferInput<typeof pageBlockSchema>;
export const pageBlockSchema = v.object({
  type: v.literal("page"),
  status_code: v.optional(v.union([v.literal(404), v.literal(500), v.literal(200)])),
  title: v.pipe(v.string(), v.trim(), v.minLength(1)),
  description: v.optional(v.pipe(v.string(), v.trim())),
  blocks: v.array(pageBlockBlocksSchema),
});

export type BlockType = Block["type"];
export type Block = v.InferInput<typeof blockSchema>;
export const blockSchema = v.union([
  textBlockSchema,
  pageBlockSchema,
  nestedBlockSchema,
  imageBlockSchema,
]);
