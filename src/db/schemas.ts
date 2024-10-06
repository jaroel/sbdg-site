import * as z from "zod";
import { parentPath, slug } from "~/zod";
import { pageBlockSchema } from "../components/blocks/schemas";

export const contentObjectBlockSchema = z.discriminatedUnion("type", [
  pageBlockSchema,
]);

export const contentObjectsTableSchema = z.object({
  id: z.number().min(1),
  parentPath: parentPath(),
  slug: slug(),
  parentId: z.number().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  object: contentObjectBlockSchema,
});
