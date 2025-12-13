import * as v from 'valibot';
// import type { Insertable, Queryable, Updatable } from "orchid-orm";
// import type * as z from "zod";
import { BaseTable, sql } from "../baseTable";
import { contentObjectBlockSchema } from "../schemas";

export class ContentObjectsTable extends BaseTable {
  readonly table = "contentObjects";
  columns = this.setColumns((t) => ({
    id: t.identity().primaryKey(),
    parentPath: t.string().startsWith("/").endsWith("/"),
    slug: t.string().trim(),
    parentId: t.integer().nullable().foreignKey("contentObjects", "id", {
      name: "FKcontentObjectsParent",
      match: "FULL",
      onUpdate: "RESTRICT",
      onDelete: "CASCADE",
    }),
    ...t.timestamps(),
    object: t.json(contentObjectBlockSchema),
  }));
  computed = this.setComputed((q) => ({
    path: sql`${q.column("parentPath")} || ${q.column("slug")}`.type((t) =>
      t.string(),
    ),
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

export const insertSchema = ContentObjectsTable.inputSchema();
export const updateSchema = ContentObjectsTable.updateSchema();
export const outputSchema = ContentObjectsTable.outputSchema();
export const createSchema = ContentObjectsTable.createSchema();

export const contentSchema = insertSchema;

export type Content = v.InferOutput<typeof insertSchema>;
export const contentFieldnames = v.keyof(contentSchema);