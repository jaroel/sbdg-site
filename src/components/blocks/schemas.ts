import { z } from "zod";
import { tiptapDocSchema } from "../input/schema";

export type TextBlock = z.infer<typeof textBlockSchema>;
export const textBlockSchema = z.object({
  type: z.literal("text"),
  text: tiptapDocSchema,
});

export type NestedBlock = z.infer<typeof nestedBlockSchema>;
export const nestedBlockSchema = z.object({
  type: z.literal("nested"),
  nestedTitle: z.string().trim().min(1),
  texts: z.array(z.discriminatedUnion("type", [textBlockSchema])),
});

export type ImageBlock = z.infer<typeof imageBlockSchema>;
export const imageBlockSchema = z.object({
  type: z.literal("image"),
  label: z.string().trim().min(1),
  fileId: z.string().trim().min(1),
});

export type TableBlock = z.infer<typeof tableBlockSchema>;
export const tableBlockSchema = z.object({
  type: z.literal("table"),
  label: z.string().trim().min(1),
  content: z.array(z.string().trim().array().min(1)).min(1),
});

export type PageBlockBlocks = z.infer<typeof pageBlockBlocksSchema>;
const pageBlockBlocksSchema = z.discriminatedUnion("type", [
  textBlockSchema,
  nestedBlockSchema,
  imageBlockSchema,
  tableBlockSchema,
]);

export type PageBlock = z.infer<typeof pageBlockSchema>;
export const pageBlockSchema = z.object({
  type: z.literal("page"),
  status_code: z.literal(404).or(z.literal(500)).or(z.literal(200)).optional(),
  title: z.string().trim().min(1),
  description: z.optional(z.string().trim()),
  blocks: pageBlockBlocksSchema.array(),
});

export type BlockType = Block["type"];
export type Block = z.infer<typeof blockSchema>;
export const blockSchema = z.union([
  textBlockSchema,
  pageBlockSchema,
  nestedBlockSchema,
  imageBlockSchema,
]);
