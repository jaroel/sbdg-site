// import type { Insertable, Queryable, Updatable } from "orchid-orm";
import type { z } from "zod";
import { BaseTable } from "../baseTable";
import { contentObjectBlockSchema } from "../schemas";

export class ContentObjectsTable extends BaseTable {
  readonly table = "contentObjects";
  columns = this.setColumns((t) => ({
    id: t.identity().primaryKey(),
    path: t.string().unique(),
    parentId: t.integer().nullable().foreignKey("contentObjects", "id", {
      name: "FKcontentObjectsParent",
      match: "FULL",
      onUpdate: "RESTRICT",
      onDelete: "CASCADE",
    }),
    ...t.timestamps(),
    object: t.json(contentObjectBlockSchema),
  }));

  relations = {
    parent: this.belongsTo(() => ContentObjectsTable, {
      columns: ["parentId"],
      references: ["id"],
    }),
    children: this.hasMany(() => ContentObjectsTable, {
      columns: ["id"],
      references: ["parentId"],
    }),
  };
}

// export type ContentObjectRowNew = Insertable<ContentObjectsTable>;
// export type ContentObjectRowUpdate = Updatable<ContentObjectsTable>;
// export type ContentObjectRowQueryable = Queryable<ContentObjectsTable>;

export const updateSchema = ContentObjectsTable.updateSchema();
export const outputSchema = ContentObjectsTable.outputSchema();

export const contentSchema = outputSchema.pick({
  id: true,
  path: true,
  parentId: true,
  createdAt: true,
  updatedAt: true,
  object: true,
});
export type Content = z.infer<typeof contentSchema>;
export const contentFieldnames = contentSchema.keyof();
