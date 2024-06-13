import * as z from "zod";
import { pageBlockSchema } from "~/components/blocks/schemas";

export const contentObjectsTableSchema = z.object({
  id: z.number().min(1),
  path: z
    .string()
    .min(1)
    .transform((arg) => arg.replace("//", "/")),
  parentId: z
    .number()
    .nullable()
    .transform((arg) => arg || null),
  createdAt: z.date(),
  updatedAt: z.date(),
  block: z.discriminatedUnion("type", [pageBlockSchema]),
});
