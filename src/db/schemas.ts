import * as v from 'valibot';
import { pageBlockSchema } from "../components/blocks/schemas";
// import { parentPath, slug } from "../zod";

export const contentObjectBlockSchema = v.variant("type", [
  pageBlockSchema,
]);

export const contentObjectsTableSchema = v.object({
  id: v.pipe(v.number(), v.minValue(1)),
  // parentPath: parentPath(),
  parentPath: v.string(),
  slug: v.string(),
  // slug: slug(),
  parentId: v.nullable(v.number()),
  createdAt: v.date(),
  updatedAt: v.date(),
  object: contentObjectBlockSchema,
});
